const cloud = require('wx-server-sdk')

async function auth() {
  const db = cloud.database()
  const _ = db.command
  const { OPENID } = cloud.getWXContext()
  let res = await db.collection('config').doc('auth').get()
  const data = res[0].value
  const myRoles = data.users[OPENID] || []
  // 没有角色配置，或被禁用，就直接返回空数组
  if (myRoles.length == 0 || data.disable.user[OPENID]) return []
  let roles = []
  myRoles.filter((value, index, array) => {
    return data.disable.roles.indexOf(value) == -1
  }).forEach(el => {
    const role = data[el] || []
    roles.push(...role)
  })
  return roles
}

async function login() {
  const db = cloud.database()
  const _ = db.command
  const { OPENID } = cloud.getWXContext()
  let date = new Date()

  // 查询用户数据
  let res = await db.collection('users').field({
    create_time: false,
    update_time: false
  }).where({
    _openid: OPENID
  }).get()

  // 如果没有用户数据
  if (res.data.length == 0) {
    // 注册
    res = await db.collection('users').add({
      data: {
        _openid: OPENID,
        create_time: date,
        update_time: date
      }
    })
    // 更新时间
    doc = res.data[0]
    delete doc.create_time
    delete doc.update_time
  } else {
    // 更新时间
    doc = res.data[0]
    await db.collection('users').doc(doc._id).update({
      data: {
        update_time: date
      }
    })
  }
  return doc
}


module.exports = {
  login,
  auth,
}
