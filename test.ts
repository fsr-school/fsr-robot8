
let a = 9;
a++;
console.log(a);

let b = 9;
const aa = 9;

console.log(aa, b);


function abc(params): string {
  let s;
  s -= params;
  return s;
}

let a3 = abc('dsfdsafas');
console.log(a3);


function name() {
  let a2 = 9;
  console.log(a2);

}

name()



let p = {
  get name() {
    // no returns.

  }
};

Object.defineProperty(p, "age", {
  get: function () {
    // no returns.
  }
});

class P {
  get name() {
    // no returns.

  }
}

let pp = new P();
console.log(pp);

