


  // var memory = {
  //   display : [],
  //   evalString : '',
  //   result: undefined
  // }
// document.querySelector('.calculator').addEventListener('click', function(e){
//   var target = e.target || e.srcElement
//   var m = memory
//
//   if(target.dataset.value) {
//     m.display.push(target.dataset.value)
//   }
//
//   if(target.dataset.operation) {
//     m.evalString = m.evalString.concat(m.display.join(''))
//     m.display = []
//     m.display.push(target.dataset.operation)
//   }
//
//   if(target.dataset.equal) {
//     m.evalString = m.evalString.concat(m.display.join(''))
//     m.result = eval(m.evalString)
//   }
//
//   //
//   console.log('final m.display: ' + m.display)
//   console.log('final evalString: ' + m.evalString)
//
//   document.querySelector('.calculator-screen').innerHTML = m.result || m.display.join('')
// })

var stacks = {
  operand : [],
  operator: [],
  currentStack: 'operand',
  clearStatus: 'all'
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
        s.operand.push(target.dataset.value)
        s.currentStack = 'operand'
        }
}

    if(target.dataset.operator) {
      if(s.currentStack === 'operator') {
        s.operator[s.operator.length -1] = target.dataset.operator
      }else {
        s.operator.push(target.dataset.operator)
        s.currentStack = 'operator'
      }
    }

    // if(currentStack = 'operand' && s.operand.length > 0) {
    //   document.querySelector('.clear').innerHTML = 'C'
    //
    // }

    // if(target.dataset.clear) {
    //   // if(s.clearStatus === 'all') {
    //   stacks = {
    //     operand : [],
    //     operator: [],
    //     currentStack: 'operand',
    //     clearStatus: 'all'
    //     }
      // } else {
      //   s.opearnd[s.operand.length -1] = 0
      //   target.dataset.innerHMTL = "AC"
      //   currentStack = 'nothing'
      // }

    //}


      console.log(stacks)

    document.querySelector('.calculator-screen').innerHTML = s.operand[s.operand.length -1]
  })
