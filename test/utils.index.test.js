import { min, max } from './tarage'
import { sleep, getTimeGap } from "../src/utils/index";

function sum(a, b) {
  return a + b;
}

function timer(n = 1) {
  return new Promise((resolve, reason) => {
    setTimeout(() => {
      resolve(n * 2)
    }, n)
  })
}

describe('简单示例', () => {
  test('works', () => {
    expect(2).toEqual(2)
  })

  test('max(2, 3) 等于 3', () => {
    expect(max(2, 3)).toBe(3);
    expect(min(5, 3)).toBe(3);
  })

  test('sum(2 + 2) 等于 4', () => {
    expect(sum(2, 3)).toBe(5);
  })
})


describe('异步示例', () => {

  test('timer(2) 异步延时测试 2*2=4', async () => {
    const data = await timer(2);
    expect(data).toBe(4);

    const d = Date.now();
    const data2 = await sleep(1000);
    expect(data2).toBe(1000);

    const d2 = Date.now() - d;
    expect(d2).toBeGreaterThanOrEqual(1000)
    expect(d2).toBeLessThanOrEqual(1100)
  })
})

// // 等于
// .toBe(number)
// // 是否接近小数（小数，保留小数位）
// .toBeCloseTo(number, Digits)
// // 大于
// .toBeGreaterThan(number)
// // 大于等于
// .toBeGreaterThanOrEqual(number)
// // 小于
// .toBeLessThan(number)
// // 大于等于
// .toBeLessThanOrEqual(number)
