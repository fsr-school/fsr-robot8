/* eslint-disable */
const request = require('request')
const cloud = require('wx-server-sdk')

// 环境变量设置 或 当前调用环境一致
const envId = (process.env && process.env.envId) || cloud.DYNAMIC_CURRENT_ENV

cloud.init({
  env: envId
})

// 创建导出数据任务
async function createExportJob(envId, accessToken, collection) {
  const date = new Date().toISOString();

  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env: envId,
          file_path: `${date}.json`,
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
  // 环境变量设置 或 当前调用环境一致
  const envId = (process.env && process.env.envId) || cloud.DYNAMIC_CURRENT_ENV
  const log = cloud.logger()
  const db = cloud.database()
  const collection = 'students' // event.collection;

  try {
    // 1. 获取 access_token
    // const { access_token } = await getAccessToken(appid, secret);
    const { result: access_token } = await cloud.callFunction({
      name: 'common',
      data: {
        name: 'getAccessToken'
      },
    })

    // 2. 导出数据任务
    const { job_id } = await createExportJob(envId, access_token, collection)

    // 将任务数据存入数据库
    const res = await db.collection('backdb').add({
      data: {
        date: new Date(),
        job_id: job_id
      }
    });
    // 打印到日志中
    log.info({
      name: 'backdb',
      collection,
      job_id,
    });

  } catch (e) {
    // 打印到日志中
    log.error({
      name: 'backdb',
      ...e
    });
  }

};


// todo-leon 将多表自动备份
// todo-leon 异步自动下载，并保存到云存储中
