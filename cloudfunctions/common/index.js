// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

// 环境变量设置 或 当前调用环境一致
const envId = (process.env && process.env.envId) || cloud.DYNAMIC_CURRENT_ENV

// 初始化 cloud
cloud.init({
  env: envId
})

const log = cloud.logger()
const db = cloud.database()

/**
 * 获取 access_token，为保存数据库口令为最新，外部请不要直接调用此函数
 * @param {object} data
 * @returns 返回 access_token
 */
async function getToken(appid, secret) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      (err, res, body) => {
        body = body ? JSON.parse(body) : {}
        if (err || !!body.errcode) {
          reject({ log: '获取 access_token 失败', err, body })
          return
        }
        resolve(body)
      }
    );
  });
}
/**
 * 缓存优化获取 access_token
 * @returns 返回 access_token
 */
async function getAccessToken() {
  // 从数据库中取
  const docRes = await db.collection('config').doc('token').get()
  const { access_token, expires, appid, secret } = docRes.data.value
  const d = new Date()
  if (d < expires) {
    return access_token
  }
  const {
    access_token: access_token_new,
    expires_in: expires_new,
  } = await getToken(appid, secret)
  // 保存到数据库中
  await db.collection('config').doc('token').update({
    data: {
      value: {
        access_token: access_token_new,
        expires: new Date(Date.now() + (expires_new - 100) * 1000)
      }
    }
  })
  return access_token_new
}


/**
 * 轮询数据库迁移状态查询，并返回导出路径
 * @param {object} data 参数
 * @param {string} data.job_id 任务id
 * @param {string} [data.access_token] 口令，如果不填则自动获取
 * @returns {string} 返回数据库备份文件路径
 */
async function getJobUrl(envId, data) {
  let { access_token, job_id } = data || {}
  if (!access_token) {
    access_token = await getAccessToken()
  }
  if (!job_id) {
    const _ = db.command
    const docRes = await db.collection('backdb').where({ job_id: _.exists(true) }).field({ job_id: true }).orderBy('date', 'desc').limit(1).get()
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
            reject({ log: '轮询数据库迁移状态查询失败', err, body })
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

const fns = {
  getAccessToken,
  getJobUrl
}

// 云函数入口函数
exports.main = async (event, context) => {
  // 环境变量设置 或 当前调用环境一致
  const envId = (process.env && process.env.envId) || cloud.DYNAMIC_CURRENT_ENV
  const { name, data } = event
  const fn = fns[name]
  let res

  try {
    res = await fn(envId, data)
  } catch (e) {
    // 打印到日志中
    log.error({ name: 'common', ...e })
  }

  return res
}
