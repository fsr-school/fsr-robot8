import { CLOUD_ERROR } from '../config/index'
import logger from '../utils/logger'


export function createCloudApi(cb, apiId) {
  return new Promise((resolve, reject) => {
    cb(res => {
      logger.groupCollapsed(`>>> cloud-api:${apiId}`)
      logger.log(res)
      logger.groupEnd()
      resolve(res.result)
    }, reason => {
      reject(reason)
    })
  }).catch(reason => {
    const { errCode } = reason
    const msg = CLOUD_ERROR[errCode]
    logger.group(`>>> cloud-api:${apiId}，${errCode}:${msg}`)
    logger.error(reason)
    logger.groupEnd()
  })
}

