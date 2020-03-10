import logger from '../utils/logger'


export function createWxApi(cb, apiId): any {
  return new Promise((resolve, reject) => {
    cb(res => {
      logger.groupCollapsed(`>>> wx-api:${apiId}`)
      logger.log(res)
      logger.groupEnd()
      resolve(res)
    }, reason => {
      logger.group(`>>> wx-api:${apiId}`)
      logger.error(reason)
      logger.groupEnd()
      reject(reason)
    })
  })
}

