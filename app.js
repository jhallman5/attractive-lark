var stacks = {
  operand : [],
  operator: [],
  currentStack: 'operand'
  }

document.querySelector('.calculator').addEventListener('click', function (event) {
  var target = event.target || event.srcElement
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

//can remove this from the eventListner
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
  var s = stacks
  var operatorsCharArray = [43, 45, 42, 47]

  if(target.charCodeAt(0) < 58 && target.charCodeAt(0) > 47){
    if(s.currentStack === 'operand') {
      if(s.operand.length === 0) {
        s.operand.push(target)
      }else {
        var value = s.operand.pop()
        value = value + target
        s.operand.push(value)
      }
    }else {
      checkPriority(s.operator, s.operand)
      s.operand.push(target)
      s.currentStack = 'operand'
    }
  }else if(operatorsCharArray.includes( target.charCodeAt(0)) ) {
    s.currentStack === 'operator'
      ? s.operator[s.operator.length - 1] = target
      : s.operator.push(target)
        s.currentStack = 'operator'
  }else if(target.charCodeAt(0) === 61 || 13 ) {
     equate(s.operand, s.operator)
  }


  document.querySelector('.calculator-screen').innerHTML = s.operand[s.operand.length -1 ] || ''
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


//  things still that still need to be done in stage 2
//   - add CSS active on keydown event
//   - change the font size of the number when it reaches 8 charaters long
//   - clean up


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
