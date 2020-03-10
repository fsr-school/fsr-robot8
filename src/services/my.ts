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
        space: 'user',
        name: 'login'
      }
    }).then(res => {
      const { status, data } = res.result
      if (status != '0') {
        reject(res)
      }
      resolve(data)
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
        space: 'user',
        name: 'setUserInfo',
        data: { uid, nickName, avatarUrl }
      }
    }).then(res => {
      const { status, data } = res.result
      if (status != '0') {
        reject(res)
      }
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  }, 'my.setUserInfo')
}


/**
 * 发送手机验证码
 */
export function getSms({ phone }) {
  return createCloudApi((resolve, reject) => {
    cloud.callFunction({
      name: 'sms',
      data: {
        space: 'sms',
        name: 'sendPIN',
        data: { phone }
      }
    }).then(res => {
      const { status, data } = res.result
      if (status != '0') {
        // todo-leon 错误处理，提示用户
        reject(res.result)
      }
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  }, 'my.getSms')
}
