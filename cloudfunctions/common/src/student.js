const cloud = require('wx-server-sdk')

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
      birthday,
      remark,
      create_time: date,
      subjects: []
    }
  })
  return _id
}


module.exports = {
  createStudent,
}
