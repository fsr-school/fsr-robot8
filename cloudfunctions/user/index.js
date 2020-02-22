/* eslint-disable */
const request = require('request')
const cloud = require('wx-server-sdk')

// 正式环境设为自动
// const envId = cloud.DYNAMIC_CURRENT_ENV
// 本地环境手动选择
// const envId = 'fsr-robot8'
const envId = 'fsr-back-robot8'

cloud.init({
  env: envId
})

/**
 * 设置运行最小时间间隔，让调用它时距上一次调用不够时间时，就使用 sleep 确保每次调用间隔时间相同
 * @param {number} [time=0] - 初始时间（毫秒值）
 */
function getTimeGap(time = 0) {
  return async function gap(gapTime) {
    const t = gapTime - (Date.now() - time);
    t > 0 && await sleep(t);
    time = Date.now();
    return t;
  };
}

/**
 * 让程序休止一定时间
 * @param {number} [time=1000] - 毫秒数
 */
async function sleep(time = 1000) {
  return new Promise(resolve => {
    time > 0 ? setTimeout(() => resolve(time), time) : resolve(time)
  });
}

// 创建导出数据任务
async function createExportJob(accessToken, collection) {
  const date = new Date().toISOString();
  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env: envId,
          file_path: `${collection}_${date}.json`,
          file_type: '1',
          query: `db.collection("${collection}").get()`
        })
      },
      (err, res, body) => {
        body = body ? JSON.parse(body) : {}
        if (err || !!body.errcode) {
          reject({ log: '创建导出数据任务失败', err, body })
          return
        }
        resolve(body)
      }
    );
  });
}

exports.main = async (event, context) => {
  const gap = process.env && process.env.gap || 1100
  const log = cloud.logger()
  const db = cloud.database()
  let collections = (process.env && process.env.collection || '').concat(',backdb,config').split(/ *[, ，] */)
    .filter((el, i, ary) => el && ary.lastIndexOf(el) == i)

  // 1. 获取 access_token
  const access_token = event && event.access_token || await cloud.callFunction({
    name: 'common',
    data: {
      name: 'getAccessToken'
    },
  });

  const timeGap = getTimeGap();
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    try {
      timeGap(0)
      // 2. 导出数据任务
      createExportJob(access_token, collection).then(job_id => {
        // 将任务数据存入数据库
        db.collection('backdb').add({
          data: {
            collection,
            date: new Date(),
            job_id: job_id
          }
        }).then(res => {
          // 打印到日志中
          log.info({
            name: 'backdb',
            collection,
            job_id,
          });
        })
      })
      i < collections.length - 1 && await timeGap(gap)
    } catch (e) {
      // 打印到日志中
      log.error({
        ...e,
        name: 'backdb',
        collection,
      });
    }
  }

};


// todo-leon 将多表自动备份
// todo-leon 异步自动下载，并保存到云存储中
