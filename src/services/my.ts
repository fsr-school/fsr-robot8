import Taro from '@tarojs/taro'
import { createCloudApi } from './cloud-api'
import { createWxApi } from './wx-api'
const { cloud } = wx;





/**
 * 登录，自动执行一次，新用户自动注册
 */
export function login() {
  return createCloudApi((resolve, reject) => {
    cloud.callFunction({
      name: 'common',
      data: {
        name: 'login'
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  }, 'my.login')
}


/**
 * 获取微信用户信息
 */
export function getUserInfo() {
  return createWxApi((resolve, reject) => {
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userInfo']) {
        reject('scope.userInfo 没有授权')
        return
      }
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      Taro.getUserInfo().then(res => {
        resolve(res.userInfo)
      }).catch(err => {
        reject(err)
      })

    }).catch(err => {
      reject(err)
    })
  }, 'my.getUserInfo')
}




/**
 * 登录，自动执行一次，新用户自动注册
 */
export function setUserInfo({ uid, nickName, avatarUrl }) {
  return createCloudApi((resolve, reject) => {
    cloud.callFunction({
      name: 'common',
      data: {
        name: 'setUserInfo',
        data: { uid, nickName, avatarUrl }
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  }, 'my.login')
}
