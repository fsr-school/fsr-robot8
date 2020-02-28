import Taro from '@tarojs/taro'
import logger from '../utils/logger'
import { IS_DEV } from '../config/index'
import { set as globalDataSet } from '../utils/global-data'

const { cloud } = wx;
/**
 * 微信云开发初始化
 */
function initWXCloud() {

  if (!cloud) {
    logger.error('请使用 2.2.3 或以上的基础库以使用云能力')
    return;
  }
  logger.log('微信云开发初始化成功！');

  // 微信云开发初始化
  cloud.init({
    // env 参数说明：
    //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //   如不填则使用默认环境（第一个创建的环境）
    env: IS_DEV ? 'fsr-back-robot8' : 'fsr-robot8',
    // 是否在将用户访问记录到用户管理中，在控制台中可见
    traceUser: !IS_DEV,
  })
}


let is_init = false
export function init() {
  if (is_init) return
  is_init = true
  initWXCloud()
  getWXUserInfo()
}

/**
 * 获取微信用户信息
 */
export function getWXUserInfo() {
  Taro.getSetting().then(res => {
    if (!res.authSetting['scope.userInfo']) return
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    Taro.getUserInfo().then(res => {
      globalDataSet('userInfo', res.userInfo)
    })
  })
}
