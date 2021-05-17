const Numbers = document.querySelectorAll('.key.number')
const Dot = document.querySelector('.key.dot')

const Operators = document.querySelectorAll('.key.operator')
const Delete = document.querySelector('.key.delete')
const Reset = document.querySelector('.key.reset')
const Enter = document.querySelector('.key.enter')

const Output = document.querySelector('.screen-container')
const previousAccount = document.querySelector('.previous-account')

let completeAccount = ''
let dotCount = 0

let operatorAvailable = false

Numbers.forEach(number => {
  number.addEventListener('click', insertNumber)
})

Operators.forEach(operator => {
  operator.addEventListener('click', insertOperator)
})

Dot.addEventListener('click', insertDot)

Enter.addEventListener('click', insertEnter)

Delete.addEventListener('click', deleteAccount)

Reset.addEventListener('click', resetCalculator)

function insertNumber() {
  const number = this.innerHTML

  if ( completeAccount.length == 1 && completeAccount == '0' ) {
    Output.value = ''
    completeAccount = ''

    operatorAvailable = false
  }

  Output.value += number
  Output.placeholder = '0'
  completeAccount += number

  operatorAvailable = true
}

function insertDot() {
  if ( !operatorAvailable && dotCount == 0 ) {
    Output.value += '0.'
    completeAccount += '0.'

    dotCount++
  }

  const accountArray = completeAccount.split('')
  const accountSpliced = accountArray.splice(-1, 1)

  if ( dotCount == 0 && accountSpliced[0] != '+' && accountSpliced[0] != '-' ) {
    Output.value += '.'
    completeAccount += '.'

    dotCount++
  }
}

function insertOperator() {
  const operator = this.innerHTML

  if ( completeAccount.length > 0 ) {
    if ( operatorAvailable ) {
      if ( operator == 'x' ) {
        completeAccount += '*'
      } else {
        completeAccount += operator
      }
  
      Output.value += operator
      dotCount = 0
    }
  
    operatorAvailable = false
  }
}

function insertEnter() {
  const accountArray = completeAccount.split('')
  const accountSpliced = accountArray.splice(-1, 1)
  
  if ( 
    accountSpliced == '*' || accountSpliced == '+' || 
    accountSpliced == '-' || accountSpliced == '/') {
      completeAccount = ''
      Output.value = ''
      return previousAccount.innerHTML = 'This account is unavailable'
    }
    
  previousAccount.innerHTML = Output.value
  const result = String(eval(completeAccount))

  if ( result == Infinity || result == NaN ) {
    completeAccount = ''
    Output.value = ''
    return previousAccount.innerHTML = 'This account is unavailable'
  }

  Output.value = result
  completeAccount = result

  checkingForDots()
}

function deleteAccount() {
  if ( completeAccount.length > 0 ) {
    const accountArray = completeAccount.split('')
    const accountSlice = completeAccount.slice(0, -1)
    const lastChar = accountArray.splice(-1, 1)

    if ( completeAccount.length == 1 && lastChar == '0' ) {
      Output.value = ''
      completeAccount = ''

      dotCount = 0
      operatorAvailable = false
    }

    if ( lastChar == '.' ) dotCount = 0

    if (lastChar == '*' || lastChar == '+' || 
    lastChar == '-' || lastChar == '/') {
      operatorAvailable = true
    }
  
    Output.value = accountSlice
    completeAccount = accountSlice
  }
}

function resetCalculator() {
  completeAccount = ''
  previousAccount.innerHTML = ''
  Output.value = ''
  Output.placeholder = 0

  operatorAvailable = false
  dotCount = 0
}

function checkingForDots() {
  const anyDot = (Output.value.split('')).filter(item => item == '.')

  if ( anyDot.length ) {
    dotCount = 1
  }
}