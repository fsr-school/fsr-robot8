import Taro from '@tarojs/taro'

export function showToDoToast() {
  Taro.showToast({
    title: '暂未实现，敬请期待',
    icon: 'none'
  })
}



/**
 * 设置运行最小时间间隔，让调用它时距上一次调用不够时间时，就使用 sleep 确保每次调用间隔时间相同
 * @param {number} [time=0] - 初始时间（毫秒值）
 */
export function getTimeGap(time = 0) {
  return async function gap(gapTime) {
    const t = gapTime - (Date.now() - time);
    t > 0 && await sleep(t);
    time = Date.now();
    return t;
  };
}

/**
 * 让程序休止一定时间
 * @param {number} [time=1000] - 毫秒数
 */
export async function sleep(time = 1000) {
  return new Promise(resolve => {
    time > 0 ? setTimeout(() => resolve(time), time) : resolve(time)
  });
}


export function sum(a: number, b: number) {
  return a + b;
}
