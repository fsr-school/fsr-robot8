const cloud = require('wx-server-sdk')
const isDev = require('./develop')
const envId = isDev ? 'fsr-back-robot8' : cloud.DYNAMIC_CURRENT_ENV
cloud.init({ env: envId })

const fns = {
  ...require('./src/job'),
}


// 云函数入口函数
exports.main = async (event, context) => {
  // todo-leon 需要考虑授权判断
  const logger = cloud.logger()
  const { name, data } = event
  const fn = fns[name || 'createAllJob']
  let res
  try {
    res = await fn({ envId, ...data })
  } catch (e) {
    // 打印高级日志
    logger.error({ ...e, name, envId })
    return res
  }
  // 打印高级日志
  logger.log({ name, envId })
  return res
}
