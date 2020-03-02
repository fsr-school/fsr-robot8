const request = require('request')
const cloud = require('wx-server-sdk')

/**
 * 获取 access_token，为保存数据库口令为最新，外部请不要直接调用此函数
 * @param {string} appid 小程序id
 * @param {string} secret 密钥
 * @returns access_token
 */
async function getToken(appid, secret) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      (err, res, body) => {
        body = body ? JSON.parse(body) : {}
        if (err || !!body.errcode) {
          reject({ fn: 'getToken', err, body })
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
  const db = cloud.database()

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

module.exports = {
  getAccessToken
}
