const express = require('express'),
  app = express()

app.use(express.static(__dirname + '/public'))

app.use(require('./routes/routes'))

app.post('/api/:operator/:a/:b', (req, res) => {
  const a = Number(req.params.a)
  const b = Number(req.params.b)
  const operator = req.params.operator
  let result;
  switch (operator) {
    case '+':
      result = add(a, b)
      break;
    case '-':
      result = subtract(a, b)
      break;
    case '*':
      result = multiply(a, b)
      break;
    case '/':
      result = divide(a, b)
      break;
    }
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
