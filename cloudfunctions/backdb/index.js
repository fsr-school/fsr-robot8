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

// 创建导出数据任务
async function createExportJob(access_token, collection) {
  const date = new Date().toISOString();

  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${access_token}`,
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
          reject({ log: '创建导出数据任务失败', access_token, err, body })
          return
        }
        resolve(body)
      }
    );
  });
}

exports.main = async (event, context) => {
  // 环境变量设置 或 当前调用环境一致
  const log = cloud.logger()
  const db = cloud.database()
  let collections = (process.env && process.env.collection || '').concat(',backdb,config').split(/ *[, ，] */)
    .filter((el, i, ary) => el && ary.lastIndexOf(el) == i)

  // 1. 获取 access_token
  const access_token = event && event.access_token || (await cloud.callFunction({
    name: 'common',
    data: {
      name: 'getAccessToken'
    },
  })).result

  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    try {

      // 2. 导出数据任务
      const { job_id } = await createExportJob(access_token, collection)

      // 将任务数据存入数据库
      const res = await db.collection('backdb').add({
        data: {
          collection,
          date: new Date(),
          job_id: job_id
        }
      });
      // 打印到日志中
      log.info({
        name: 'backdb',
        collection,
        job_id
      });

    } catch (e) {
      // 打印到日志中
      log.error({
        name: 'backdb',
        collection,
        ...e
      });
    }
  }

};


// todo-leon 将多表自动备份
// todo-leon 异步自动下载，并保存到云存储中
