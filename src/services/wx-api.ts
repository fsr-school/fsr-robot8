import Taro from '@tarojs/taro'
import { set as globalDataSet } from '@/utils/global-data'

/**
 * 获取用户信息
 */
/*
function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              resolve(res.userInfo)
            },
            fail(...args) {
              console.error('wx-api getUserInfo', args)
              reject(args)
            }
          })
        } else {
          reject('没有用户授权')
        }
      },
      fail(...args) {
        console.error('wx-api getAuthSetting', args)
        reject(args)
      }
    })
  })
}

init2() {
  getUserInfo().then((res) => {
    Taro.setStorageSync('userInfo', res)
  }).catch((...res) => {
    console.error(res);
  })
}
*/

export default {
  init() {
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userInfo']) return
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      Taro.getUserInfo().then(res => {
        globalDataSet('userInfo', res.userInfo)
      })
    })
  }
}
