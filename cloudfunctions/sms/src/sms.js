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
    logger.warn({ id: 9999, PIN });
    // 发送短信
    sendSms({ phone, params }).then(async response => {
      logger.warn({ id: '88-88', phone, OPENID: String(OPENID) + 'OPENID' });
      // 查询短信数据
      let res = await db.collection('sms').where({
        _openid: OPENID
      }).get()

      logger.warn({ id: 777, v: res && JSON.stringify(res) });
      const _doc = res.data[0]

      logger.warn({ id: 1111, v: _doc && JSON.stringify(_doc) });
      const time = new Date()
      logger.warn({ id: 2222, time });
      const expire_time = new Date(time.valueOf() + TIME * 60000)
      logger.warn({ id: 3333, expire_time });
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
