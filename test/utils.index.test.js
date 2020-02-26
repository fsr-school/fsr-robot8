// import { sum } from '../src/utils/index'

function sum(a, b) {
  return a + b;
}

test('sum(2 + 2) 等于 4', () => {
  expect(sum(2, 2)).toBe(4);
  expect(sum(2, 2)).toBe(5);
})
