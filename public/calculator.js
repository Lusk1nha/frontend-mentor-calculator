const Numbers = document.querySelectorAll('.key.number')
const Operators = document.querySelectorAll('.key.operator')
const Delete = document.querySelector('.key.delete')
const Reset = document.querySelector('.key.reset')
const Enter = document.querySelector('.key.enter')

const screen = document.querySelector('.screen-container')

let firstAccount = ''
let operatorAccount = ''
let secondAccount = ''

let operatorActive = false
let completeAccount = ''

Numbers.forEach(number => {
  number.addEventListener('click', insertNumber)
});

Operators.forEach(operator => {
  operator.addEventListener('click', insertOperator)
})

Delete.addEventListener('click', pressDelete)

Reset.addEventListener('click', pressReset)

Enter.addEventListener('click', pressEnter)

function insertNumber() {
  const number = this.innerHTML

  if (numberError(number)) return

  screen.value += number
  completeAccount += number

  function numberError() {
    if ( firstAccount == '' && number == 0 || firstAccount == '' && number == '.' ) {
      return true
    }

    if ( !operatorActive && firstAccount.length > 8 ) return true
    else if ( secondAccount.length > 8 ) return true

    if ( !operatorActive ) {
      firstAccount += number
      return false
    }

    if ( secondAccount == '' && number == '.' ) {
      return true
    }

    secondAccount += number
    return false
  }
}

function insertOperator() {
  let operator = this.innerHTML

  if ( operatorError() ) return true

  if ( !firstAccount && operator == '-' ) {
    firstAccount += '-'
    return completeAccount += '-'
  }

  operatorActive = true
  operatorAccount = operator
  return completeAccount += operator

  function operatorError() {
    if ( !firstAccount && operator != '-' ) return true
    if ( operatorAccount ) return true

    screen.value += operator
  
    if ( operator == 'x' ) operator = '*'
  }
}

function pressEnter() {
  if ( !firstAccount || !secondAccount ) return

  let result = eval(completeAccount).toString()
  if ( result == 0 ) result = ''

  completeAccount = result
  screen.value = result

  firstAccount = result
  operatorAccount = ''
  secondAccount = ''

}

function pressDelete() {
  const defaultValue = screen.value.split('')
  defaultValue.pop()

  if ( secondAccount != '' ) {
    secondAccount = secondAccount.slice(0, -1)

  } else {
    if ( operatorActive ) {
      operatorActive = false
      operatorAccount = ''

    } else {
      if ( firstAccount != '' ) {
        firstAccount = firstAccount.slice(0, -1)

      } else return
    }
  }

  screen.value = defaultValue.join('')
  completeAccount = defaultValue.join('')
  return
}

function pressReset() {
  completeAccount = ''
  screen.value = ''

  firstAccount = ''
  operatorAccount = ''
  secondAccount = ''

  operatorActive = false
}