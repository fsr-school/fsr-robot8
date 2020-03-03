import logger from '../utils/logger'


export function createWxApi(cb, apiId) {
  return new Promise((resolve, reject) => {
    cb(res => {
      logger.groupCollapsed(`>>> wx-api:${apiId}`)
      logger.log(res)
      logger.groupEnd()
      resolve(res)
    }, reason => {
      reject(reason)
    })
  }).catch(reason => {
    logger.group(`>>> wx-api:${apiId}`)
    logger.error(reason)
    logger.groupEnd()
  })
}

