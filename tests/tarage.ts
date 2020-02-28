import { max as max2 } from "./tarage2";


export function min(a: number, b: number) {
  return a < b ? a : b;
}

export function max(a: number, b: number) {
  return max2(a, b)
}
