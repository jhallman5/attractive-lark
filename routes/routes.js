const express = require('express'),
  app = express(),
  router = express.Router(),
  controller = require('../models/app')

module.exports = router

router.get('/', (request, response) => {
  response.sendfile('views/index.html')
})
  

app.post('/api/add/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const result = add(a,b)
  res.send(result.toString())
})

app.get('/api/subtract/:a/:b', (req, res) => {
  let headerInfo = req.header
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const result = subtract(a,b)
  res.send(result.toString())
  res.send(headerInfo)
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
