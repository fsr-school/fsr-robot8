const cloud = require('wx-server-sdk')
const isDev = require('./dev')
const envId = isDev ? 'fsr-back-robot8' : cloud.DYNAMIC_CURRENT_ENV
cloud.init({ env: envId })

const fns = {
  user: require('./src/user'),
}

// 接口函数书写规则：
// 正确返回内容，直接返回data，由主函数打包状态返回客户端：{status:0, data:data}
// 错误需要返回详细数据：{status:status | -1[, data:data]}

// 云函数入口函数
exports.main = async (event, context) => {
  // todo-leon 需要考虑授权判断
  const logger = cloud.logger()
  let { OPENID } = cloud.getWXContext()
  // 云测试环境时取不到，用我的帐号测试
  if (isDev && !OPENID) OPENID = 'oMBkB0TWfwBlqUk-1P6lHi8J-wno'
  const { space, name, data } = event
  let res
  try {
    const fn = fns[space][name]
    res = await fn({ OPENID, envId, ...data })
  } catch (err) {
    // 打印高级日志
    logger.error({ err: JSON.stringify(err), name, envId })
    return { status: err.status || -1, data: err.data }
  }
  // 打印高级日志
  logger.log({ name, envId })
  return { status: 0, data: res }
}
