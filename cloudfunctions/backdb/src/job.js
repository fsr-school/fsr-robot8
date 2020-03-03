const request = require('request')
const cloud = require('wx-server-sdk')
const { getAccessToken } = require('./token')

// /**
//  * 调用共用云函数中获取口令
//  */
// async function getAccessToken() {
//   return (await cloud.callFunction({
//     name: 'common',
//     data: {
//       name: 'getAccessToken'
//     },
//   })).result
// }

/**
 * 创建导出数据任务
 */
async function createJob({ envId, access_token, collection }) {
  if (!access_token) access_token = await getAccessToken()
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
          reject({ err, body })
          return
        }
        resolve(body)
      }
    );
  });
}

/**
 * 创建所有在 `process.env.collection` 里配置表的备份任务
 */
async function createAllJob({ envId, access_token }) {
  if (!access_token) access_token = await getAccessToken()
  const db = cloud.database()
  let collections = (process.env && process.env.collection || '').concat(',config,backdb').split(/ *[, ，] */)
    .filter((el, i, ary) => el && ary.lastIndexOf(el) == i)

  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < collections.length; index++) {
      let collection = collections[index];
      try {
        // 创建导出数据任务
        let { job_id } = await createJob({ envId, access_token, collection })
        // 将任务数据存入数据库
        await db.collection('backdb').add({
          data: {
            collection: collection,
            date: new Date(),
            job_id: job_id
          }
        });
      } catch (e) {
        // 打印高级日志
        reject({ ...e, envId, access_token, collection, collections })
        return
      }
    }
    resolve()
  })
};

/**
 * 轮询数据库迁移状态查询，并返回导出路径
 * @param {object} data 参数
 * @param {string} data.job_id 任务id
 * @param {string} [data.access_token] 口令，如果不填则自动获取
 * @returns {string} 返回数据库备份文件路径
 */
async function getJobUrl({ envId, access_token, job_id }) {
  if (!access_token) access_token = await getAccessToken()
  if (!job_id) {
    const db = cloud.database()
    const _ = db.command
    const docRes = await db.collection('backdb').where({
      job_id: _.exists(true)
    }).field({
      job_id: true
    }).orderBy('date', 'desc').limit(1).get()
    job_id = docRes.data[0].job_id
  }
  return new Promise((resolve, reject) => {
    // 轮询任务状态
    const timer = setInterval(() => {
      request.post(
        `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${access_token}`,
        {
          body: JSON.stringify({
            env: envId,
            job_id: job_id
          })
        },
        (err, res, body) => {
          body = body ? JSON.parse(body) : {}
          if (err || !!body.errcode) {
            clearInterval(timer);
            reject({ err, body })
            return
          }

          const { status, file_url } = body

          if (status === 'success') {
            clearInterval(timer)
            resolve(file_url)
          }
        }
      );
    }, 200);
  });
}


module.exports = {
  'undefined': createAllJob,
  createAllJob,
  createJob,
  getJobUrl,
}
