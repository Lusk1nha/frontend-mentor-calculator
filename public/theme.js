const themeNumber = document.querySelectorAll('.theme-number')
const body = document.body

themeNumber.forEach(theme => {
  theme.addEventListener('click', () => {
    const themeValue = theme.innerHTML

    body.classList = ''
    body.classList.add(`theme-${themeValue}`)
  })
})
