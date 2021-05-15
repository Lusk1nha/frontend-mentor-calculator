const themeSlider = document.querySelector('.theme-slider')

let sliderCount = 1

themeSlider.addEventListener('click', () => {
  const body = document.body

  sliderCount++
  
  if ( sliderCount == 4 ) sliderCount = 1
  
  body.classList = ''
  body.classList.add(`theme-${sliderCount}`)
})