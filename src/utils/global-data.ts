import { setStorageSync, getStorageSync } from '@tarojs/taro';
const globalData = {}

export function setGlobalData(key, val, isStore = false) {
  globalData[key] = val
  isStore && setStorageSync(key, val)
}

export function getGlobalData(key, isStore = false) {
  let v = globalData[key]
  isStore && (v = getStorageSync(key))
  return v
}
