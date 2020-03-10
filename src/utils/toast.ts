import Taro from '@tarojs/taro'

// BUG Toast 显示到 Textarea 文本下方了
/**
 * 提示：暂未实现，敬请期待
 */
export function showToDoToast() {
  showToast({
    title: '暂未实现，敬请期待',
  })
}

/**
 * 提示：错误
 */
export function showToast(opt) {
  Taro.showToast({
    title: '错误',
    duration: 2000,
    ...opt,
    icon: 'none',
  })
}

/**
 * 提示：成功
 */
export function showSuccessToast(opt) {
  Taro.showToast({
    title: '成功',
    duration: 2000,
    ...opt,
    icon: 'success',
  })
}


/**
 * 提示：正在加载中
 */
export function showLoadingToast(opt) {
  Taro.showToast({
    title: '正在加载中',
    mask: true,
    duration: 5000,
    ...opt,
    icon: 'loading',
  })
}


/**
 * 隐藏提示
 */
export function hideToast() {
  Taro.hideToast()
}
