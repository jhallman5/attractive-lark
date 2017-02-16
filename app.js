var stacks = {
  operand : [],
  operator: [],
  currentStack: 'operand'
  }

document.querySelector('.calculator').addEventListener('click', function(e) {
  var target = e.target || e.srcElement
  var s = stacks

  if (target.dataset.value) {
    if(s.currentStack === 'operand') {
      if(s.operand.length === 0) {
        s.operand.push(target.dataset.value)
      }else {
        var value = s.operand.pop()
        value = value + target.dataset.value
        s.operand.push(value)
      }
    }else {
      checkPriority(s.operator, s.operand)
      s.operand.push(target.dataset.value)
      s.currentStack = 'operand'
    }
  }

  if(target.dataset.operator){
    s.currentStack === 'operator'
      ? s.operator[s.operator.length - 1] = target.dataset.operator
      : s.operator.push(target.dataset.operator)
        s.currentStack = 'operator'
  }

//this could be moved outside
  if(s.currentStack === 'operand' && s.operand.length > 0) {
    document.querySelector('.clear').innerHTML = 'C'
  }

  if(target.dataset.clear) {
    if( document.querySelector('.clear').innerHTML === 'C' && s.currentStack === 'operand') {
      s.operand.pop()
      document.querySelector('.clear').innerHTML = "AC"
    }else if (document.querySelector('.clear').innerHTML = "AC") {
      stacks = {
          operand : [],
          operator: [],
          currentStack: 'operand'
          }
    }
  }

  if(target.dataset.equal) {
     equate(s.operand, s.operator)
    }

  document.querySelector('.calculator-screen').innerHTML = s.operand[s.operand.length -1 ] || ''
})

window.addEventListener('keypress', function(event) {
  var target = String.fromCharCode(event.which)


  console.log(target)



  })

function checkPriority(stackOps, stackNum) {
  if(stackOps.length > 1) {
    var lastOperator = stackOps.pop()
    while(operatorHasLowerPriority(stackOps, lastOperator) && stackOps.length > 0) {
      stackNum.push(evalulate(stackNum, stackOps) )
    }
    stackOps.push(lastOperator)
  }
}

function operatorHasLowerPriority(stackOps, operator) {
  var currentStackPriority = stackOps[stackOps.length - 1] === ('+' ||'-') ? 1 : 2
  var operatorPriority = operator === ('+' || '-') ? 1 : 2
  return operatorPriority < currentStackPriority ? true : false
}

function evalulate(stackNum, stackOps) {
  var value1 = stackNum.pop()
  var comparison = stackOps.pop()
  var value2 = stackNum.pop()
  return eval(value2 + comparison + value1).toString()
}

function equate(stackNum, stackOps) {
  while(stackNum.length > 1) {
    stackNum.push(evalulate(stackNum, stackOps))
  }
  return stackNum
}
