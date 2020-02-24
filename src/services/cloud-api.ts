import Taro from '@tarojs/taro'
import { IS_DEV } from '@/config/index'
const { cloud } = wx;


export function createDbApi(cb, apiId) {
  return new Promise((resolve, reject) => {
    return cb((...res) => {
      console.log('db-api', apiId, JSON.parse(res))
      resolve(...res)
    }, reason => {
      reject(reason)
    })
  }).catch(reason => {
    // todo-leon 可以在这里做共用错误处理
    const { errId } = reason;
    console.error('db-api', apiId, ...reason)
  })
}

export function createCloudApi(cb, apiId) {
  return new Promise((resolve, reject) => {
    return cb((...res) => {
      console.log('db-api', apiId, JSON.parse(res))
      resolve(...res)
    }, reason => {
      reject(reason)
    })
  }).catch(reason => {
    // todo-leon 可以在这里做共用错误处理
    const { errId } = reason;
    console.error('cloud-api', apiId, ...reason)
  })
}

