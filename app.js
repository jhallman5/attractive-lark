var stacks = {
  operand : [],
  operator: [],
  currentStack: 'operand'
  }

document.querySelector('.calculator').addEventListener('click', function (event) {
  var target = event.target || event.srcElement

  if (target.dataset.value) {
    if(stacks.currentStack === 'operand') {
      if(stacks.operand.length === 0) {
        stacks.operand.push(target.dataset.value)
      }else {
        var value = stacks.operand.pop()
        value = value + target.dataset.value
        stacks.operand.push(value)
      }
    }else {
      checkPriority(stacks.operator, stacks.operand)
      stacks.operand.push(target.dataset.value)
      stacks.currentStack = 'operand'
    }
  }

  if(target.dataset.operator){
    if(stacks.currentStack === 'operator') {
       stacks.operator[stacks.operator.length - 1] = target.dataset.operator
    }else {
      stacks.operator.push(target.dataset.operator)
      stacks.currentStack = 'operator'
    }
  }

  if(stacks.currentStack === 'operand' && stacks.operand.length > 0) {
    document.querySelector('.clear').innerHTML = 'C'
  }

  if(target.dataset.clear) {
    if( document.querySelector('.clear').innerHTML === 'C' && stacks.currentStack === 'operand') {
      stacks.operand.pop()
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
     equate(stacks.operand, stacks.operator)
    }
  document.querySelector('.calculator-screen').innerHTML = stacks.operand[stacks.operand.length -1 ] || ''
})

window.addEventListener('keypress', function(event) {
  var target = String.fromCharCode(event.which)
  var operatorsCharArray = [43, 45, 42, 47]

  if(target.charCodeAt(0) < 58 && target.charCodeAt(0) > 47){
    if(stacks.currentStack === 'operand') {
      if(stacks.operand.length === 0) {
        stacks.operand.push(target)
      }else {
        var value = stacks.operand.pop()
        value = value + target
        stacks.operand.push(value)
      }
    }else {
      checkPriority(stacks.operator, stacks.operand)
      stacks.operand.push(target)
      stacks.currentStack = 'operand'
    }
  }else if(operatorsCharArray.includes( target.charCodeAt(0)) ) {
    if(stacks.currentStack === 'operator') {
      stacks.operator[stacks.operator.length - 1] = target
    }else {
      stacks.operator.push(target)
      stacks.currentStack = 'operator'
    }
  }else if(target.charCodeAt(0) === 61 || 13 ) {
     equate(stacks.operand, stacks.operator)
  }


  document.querySelector('.calculator-screen').innerHTML = stacks.operand[stacks.operand.length -1 ] || ''
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

function findDivToHighlight(parentDiv, valueToFind) {
  var interiorDivs = parentDiv.getElementsByTagName('div')
  var soughtAfterDiv;

  for(var i = 0; i < interiorDivs.length; i++) {
    if(interiorDivs[i].dataset.value === valueToFind) {
      soughtAfterDiv = interiorDivs[i]
    }
   }

   return soughtAfterDiv
}

function findOperatorToHighlight(parentDiv, valueToFind) {
  var interiorDivs = parentDiv.getElementsByTagName('div')
  var soughtAfterDiv;

  for(var i = 0; i < interiorDivs.length; i++) {
    if(interiorDivs[i].dataset.operator === valueToFind) {
      soughtAfterDiv = interiorDivs[i]
    }
   }

   return soughtAfterDiv
}

window.addEventListener('keydown', function(event) {
  var target = String.fromCharCode(event.which)
  var targetdiv;
  var operatorsCharArray = [43, 45, 42, 47]

  if(target.charCodeAt(0) < 58 && target.charCodeAt(0) > 47){
    targetdiv = findDivToHighlight(document.querySelector('.calculator'), target)
    targetdiv.className += ' greyKeyDown'
  }else if( operatorsCharArray.includes( target.charCodeAt(0)) ){
    targetdiv = findOperatorToHighlight(document.querySelector('.calculator'), target)
    targetdiv.className += ' orangeKeyDown'
  }
})

window.addEventListener('keyup', function(event) {
  var target = String.fromCharCode(event.which)
  var targetdiv;
  var operatorsCharArray = [43, 45, 42, 47]

  if(target.charCodeAt(0) < 58 && target.charCodeAt(0) > 47){
    targetdiv = findDivToHighlight(document.querySelector('.calculator'), target)
    targetdiv.className = targetdiv.className.replace( /(?:^|\s)greyKeyDown(?!\S)/g , '' )
  }else if( operatorsCharArray.includes( target.charCodeAt(0)) ){
    targetdiv =findOperatorToHighlight(document.querySelector('.calculator'), target)
    targetdiv.className = targetdiv.className.replace( /(?:^|\s)orangeKeyDown(?!\S)/g , '' )
  }
})
