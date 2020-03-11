const cloud = require('wx-server-sdk')
const { dateFormat } = require('../utils/date')

/**
 * 创建学生
 */
async function createStudent({ OPENID, name, sex, birthday, remark }) {
  const db = cloud.database()
  let date = new Date()

  const { _id } = await db.collection('students').add({
    data: {
      name,
      sex,
      birthday: new Date(birthday),
      remark,
      create_time: date,
      subjects: []
    }
  })
  return _id
}

/**
 * 获取学生
 */
async function getStudent({ OPENID, _id }) {
  const db = cloud.database()

  const { data } = await db.collection('students').doc(_id).get()
  delete data.create_time
  delete data.subjects
  data.birthday = dateFormat('YYYY-m-d', data.birthday)
  return data
}


/**
 * 更新学生
 */
async function setStudent({ OPENID, _id, name, sex, birthday, remark }) {
  const db = cloud.database()

  await db.collection('students').doc(_id).update({
    data: {
      name,
      sex,
      birthday: new Date(birthday),
      remark,
    }
  })
}

/**
 * 更新学生
 */
async function getStudentList({ OPENID }) {
  const db = cloud.database()

  const { data } = await db.collection('students').where({

  })
    // 按报名时间排倒序，最新报名在第1条
    .orderBy('subjects.0.date', 'desc') // asc
    // 重复或没有报名时，按创建时间倒序
    .orderBy('create_time', 'desc') // asc
    .get()
  return data
}


module.exports = {
  createStudent,
  getStudent,
  setStudent,
  getStudentList,
}
