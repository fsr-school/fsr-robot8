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
