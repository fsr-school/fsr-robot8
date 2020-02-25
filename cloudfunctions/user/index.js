/* eslint-disable */
const request = require('request')
const cloud = require('wx-server-sdk')

// todo-leon (此文件要更换) 多表同步备份完成，需要测试效率压力，还可以考虑自已查询保存文件方案

// 正式环境设为自动
// const envId = cloud.DYNAMIC_CURRENT_ENV
// 本地环境手动选择
// const envId = 'fsr-robot8'
const envId = 'fsr-back-robot8'

cloud.init({
  env: envId
})

exports.main = async (event, context) => {
  const log = cloud.logger()
  const db = cloud.database()
  const _ = db.command
  const { name } = event
  let { OPENID, APPID } = cloud.getWXContext()
  let date = new Date()
  let doc

  try {

    let res = await db.collection('users').field({
      create_time: false,
      update_time: false
    }).where({
      _openid: OPENID,
      auth: _.nin(['disabled'])
    }).get()

    if (res.data.length == 0) {
      res = await db.collection('users').add({
        data: {
          _openid: OPENID,
          auth: ['user'],
          create_time: date,
          update_time: date
        }
      })
      doc = res.data[0]
      delete doc.create_time
      delete doc.update_time
    } else {
      doc = res.data[0]
      await db.collection('users').doc(doc._id).update({
        data: {
          update_time: date
        }
      })
    }
    return doc
  } catch (e) {
    // 打印到日志中
    log.error({
      ...e,
      name: 'user',
    });
  }

  // // 将任务数据存入数据库
  // db.collection('backdb').add({
  //   data: {
  //     collection,
  //     date: new Date(),
  //     job_id: job_id
  //   }
  // }).then(res => {
  //   // 打印到日志中
  //   log.info({
  //     name: 'backdb',
  //     collection,
  //     job_id,
  //   });
  // })

};
