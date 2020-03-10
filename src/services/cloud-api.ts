import { APP_ERROR, CLOUD_ERROR } from '../config/index'
import logger from '../utils/logger'


export function createCloudApi(cb, apiId): any {
  return new Promise((resolve, reject) => {
    cb(res => {
      logger.groupCollapsed(`>>> cloud-api:${apiId}`)
      logger.log(res)
      logger.groupEnd()
      resolve(res)
    }, reason => {
      // 请求错误、网络错误、调用错误、语法错误等
      const { errCode, status } = reason
      const msg = APP_ERROR[status] || CLOUD_ERROR[errCode]
      logger.group(`>>> cloud-api:${apiId}，${errCode}:${msg}`)
      logger.error(reason)
      logger.groupEnd()
      reject(reason)
    })
  })
}

