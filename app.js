var stacks = {
  operand : [],
  operator: [],
  currentStack: true,
  clearStatus: 'all'
  }

document.querySelector('.calculator').addEventListener('click', function(e) {
  var target = e.target || e.srcElement
  var s = stacks

  if (target.dataset.value) {
    if(s.currentStack === true) {
      if(s.operand.length === 0) {
        s.operand.push(target.dataset.value)
      }else {
        var value = s.operand.pop()
        value = value + target.dataset.value
        s.operand.push(value)
      }
    }else {
      s.operand.push(target.dataset.value)
      s.currentStack = true
    }
  }

  if(target.dataset.operator) {
      if(s.currentStack === false) {
        console.log(s.operator[s.operator.length - 1])
        s.operator[s.operator.length - 1] = target.dataset.operator
      }else {
        s.operator.push(target.dataset.operator)
        s.currentStack = false
      }
    }

    if(s.currentStack === true && s.operand.length > 0) {
      document.querySelector('.clear').innerHTML = 'C'
    }

    if(target.dataset.clear) {
      if( document.querySelector('.clear').innerHTML === 'C' && s.currentStack === true) {
        s.operand.pop()
        document.querySelector('.clear').innerHTML = "AC"
      }else if (document.querySelector('.clear').innerHTML = "AC") {
        stacks = {
            operand : [],
            operator: [],
            currentStack: 'operand',
            clearStatus: 'all'
            }
      }
    }

      console.log(stacks)

    document.querySelector('.calculator-screen').innerHTML = s.operand[s.operand.length -1] || ''
  })
