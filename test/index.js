function htmlLog(args) {
  let app = document.getElementById('app')
  let p = document.createElement('p')
  p.innerHTML = JSON.stringify({ ...args })
  app.appendChild(p)
}


const logger = {
  log: (...args) => {
    console.log(...args)
    htmlLog(...args)

  }
}

function* countAppleSales() {
  var saleList = [3, 7, 5];
  for (var i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}

var appleStore = countAppleSales(); // Generator {}
console.log(appleStore.next()); // {value: 3, done: false }
console.log(appleStore.next()); // {value: 7, done: false }
console.log(appleStore.next()); // {value: 5, done: false }
console.log(appleStore.next()); // {value: undefined, done: true }

