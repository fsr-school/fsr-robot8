import Taro from '@tarojs/taro'

import { showSuccessToast, showToast, showLoadingToast, hideToast } from '@/utils/toast';
import logger from '@/utils/logger'
import { IS_DEV } from '@/config/index'

import { createCloudApi } from './cloud-api'
import { createWxApi } from './wx-api'

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
    // env: IS_DEV ? 'fsr-back-robot8' : 'fsr-robot8',
    env: 'fsr-back-robot8', // todo-leon 测试用
    // 是否在将用户访问记录到用户管理中，在控制台中可见
    traceUser: !IS_DEV,
  })
}


let is_init = false
export function init() {
  if (is_init) return
  is_init = true
  initWXCloud()
}

/**
 * 上传图片
 */
export function uploadImage({ filePath, type, name,
  onProgressUpdate = (res) => {
    logger.log('上传进度', res.progress, res.totalBytesSent, res.totalBytesExpectedToSend)
  },
  getAbort = (abort: Function) => abort }) {
  return createCloudApi((resolve, reject) => {
    // loading
    showLoadingToast({ title: '上传中' })
    // 上传图片
    const cloudPath = type + '/' + name + filePath.match(/\.[^.]+?$/)[0]
    const uploadTask = cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        showSuccessToast({ title: '上传成功' })
        resolve(res.fileID)
      },
      fail: err => {
        showToast({ title: '上传失败' })
        reject(err)
      },
      complete: () => {
        // hide loading
        hideToast()
      }
    })
    // 处理上传进度
    uploadTask.onProgressUpdate(onProgressUpdate)
    // 取消上传任务
    getAbort(uploadTask.abort)
  }, 'index.uploadImage')
}


/**
 * 选择图片
 */
export function chooseImage({ count = 1 }) {
  return createWxApi((resolve, reject) => {
    Taro.chooseImage({
      count: count,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    }).then(res => {
      resolve(res.tempFiles) // {path, size}
    }).catch(err => {
      reject(err)
    })
  }, 'index.chooseImage')
}

