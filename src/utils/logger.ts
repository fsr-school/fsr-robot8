import { IS_DEV } from '@/config/index'


let enabled = IS_DEV;

export function setEnabledLogger(isEnabled = true): void {
  enabled = isEnabled
}


const logger = {
  /**
   * 打印信息日志
   */
  log: (...args) => {
    if (!enabled) return
    console.log(...args)
  },
  /**
   * 打印警告日志
   */
  warn: (...args) => {
    if (!enabled) return
    console.warn(...args)
  },
  /**
   * 打印错误日志
   */
  error: (...args) => {
    if (!enabled) return
    console.error(...args)
  },
  /**
   * 创建打印组
   */
  group: (...args) => {
    if (!enabled) return
    console.group(...args)
  },
  /**
   * 创建已折叠打印组
   */
  groupCollapsed: (...args) => {
    if (!enabled) return
    console.groupCollapsed(...args)
  },
  /**
   * 结束打印组
   */
  groupEnd: () => {
    if (!enabled) return
    console.groupEnd()
  },
}


export default logger
