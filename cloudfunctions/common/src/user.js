const cloud = require('wx-server-sdk')
/**
 * 获取用户授权数组
 */
async function auth({ OPENID }) {
  const db = cloud.database()
  const _ = db.command
  let res = await db.collection('config').doc('auth').get()
  const data = res.data.value
  const myRoles = data.users[OPENID]

  let roles = []
  // 没有角色配置，或被禁用，就直接返回空数组
  if (!myRoles || myRoles.length == 0 || data.disable.users[OPENID]) return roles
  // 过滤掉被禁用的角色，再组合有效权限返回
  myRoles.filter((value, index, array) => {
    return data.disable.roles.indexOf(value) == -1
  }).forEach(el => {
    const role = data.roles[el]
    role && roles.push(...role)
  })
  return roles
}

/**
 * 登录，自动注册
 */
async function login({ OPENID }) {
  const logger = cloud.logger()
  const db = cloud.database()
  const _ = db.command
  let date = new Date()

  // 查询用户数据
  let res = await db.collection('users').field({
    create_time: false,
    update_time: false
  }).where({
    _openid: OPENID
  }).get()

  let doc
  // 如果没有用户数据
  if (res.data.length == 0) {
    // 注册
    doc = {
      _openid: OPENID,
      create_time: date,
      update_time: date
    }
    res = await db.collection('users').add({ data: doc })
    // 更新时间
    delete doc.create_time
    delete doc.update_time
    doc._id = res._id
  } else {
    // 更新时间
    doc = res.data[0]
    await db.collection('users').doc(doc._id).update({
      data: {
        update_time: date
      }
    })
  }
  // 增加权限配置
  doc.auth = await auth({ OPENID })
  return doc
}

/**
 * 设置用户基本数据
 */
async function setUserInfo({ OPENID, nickName, avatarUrl }) {
  const db = cloud.database()

  await db.collection('users').where({
    _openid: OPENID
  }).update({
    data: {
      nickName,
      avatarUrl,
    }
  })
}


/**
 * 设置用户手机号
 */
async function setPhone({ OPENID, phone, PIN }) {
  // 查询
  const db = cloud.database()
  const _ = db.command
  const { data } = await db.collection('sms').where({
    _openid: OPENID,
    phone,
    PIN,
    expire_time: _.gte(new Date())
  }).get()
  // 设置手机号失败，验证码错误或失效
  if (data.length == 0) throw { status: '2101', err: { phone, PIN } }
  // 更新用户手机号
  await db.collection('users').where({
    _openid: OPENID
  }).update({
    data: {
      phone,
    }
  })
  // 删除所有此手机短信记录
  await db.collection('sms').where({ phone }).remove()

}


module.exports = {
  login,
  auth,
  setUserInfo,
  setPhone,
}
