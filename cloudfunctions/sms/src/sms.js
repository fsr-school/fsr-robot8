const { sendSms } = require('./tencentcloud-sms')
const cloud = require('wx-server-sdk')


async function sendPIN({ OPENID, phone }) {
  const logger = cloud.logger()
  const db = cloud.database()
  const _ = db.command
  return new Promise(async (resolve, reject) => {
    // 验证手机号格式
    if (!/^1\d{10}$/.test(phone)) reject({ status: '1101', phone })
    const TIME = '10'
    const PIN = Math.random().toString().slice(-4)
    const params = [PIN, TIME]
    // 发送短信
    sendSms({ phone, params }).then(async response => {
      logger.warn({ id: '88-88', phone, OPENID: String(OPENID) + 'OPENID' });
      // 查询短信数据
      let res = await db.collection('sms').where({
        _openid: OPENID
      }).get()

      const _doc = res.data[0]

      const time = new Date()
      const expire_time = new Date(time.valueOf() + TIME * 60000)
      const opt = {
        data: {
          _openid: OPENID,
          phone,
          PIN,
          expire_time
        }
      }
      // 更新数据
      if (!_doc) {
        await db.collection('sms').add(opt)
      } else {
        await db.collection('sms').doc(_doc._id).update(opt)
      }
      resolve()
    }).catch(err => {
      reject({ status: '1102', err, phone })
    })
  })
}


module.exports = {
  sendPIN,
}
