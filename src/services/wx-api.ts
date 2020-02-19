import Taro from '@tarojs/taro'


/**
 * 获取用户信息
 */
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


export default {
  init() {
    getUserInfo().then((ret) => {
      Taro.setStorageSync('userInfo', ret)

    }).catch((...ret) => {
      console.error(ret);
    })
  }
}
