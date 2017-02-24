const express = require('express'),
  app = express()

app.use(express.static(__dirname + '/public'))

app.use(require('./routes/routes'))

app.get('/api/add/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const result = add(a,b)
  res.send(result.toString())
})

app.get('/api/subtract/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const result = subtract(a,b)
  res.send(result.toString())
  })

app.get('/api/multiply/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const result = multiply(a,b)
  res.send(result.toString())

})

app.get('/api/divide/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const result = divide(a,b)
  res.send(result.toString())
})

function add(a, b) {
  return a + b
}
function subtract(a, b) {
  return a - b
}
function multiply(a, b) {
  return a * b
}
function divide(a, b) {
  return a / b
}

app.listen(3000)
console.log('server running on port 3000')
