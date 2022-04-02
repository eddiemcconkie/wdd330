import { getLocalStorage, addClass } from './utils.js'

const questionsButtonSet = () => {
  const parent = document.createElement('div')
  addClass(parent, 'questions')

  const minQuestions = 5
  const maxQuestions = 50
  let preferredNumQuestions = parseInt(getLocalStorage('numQuestions'))
  preferredNumQuestions = Math.round(preferredNumQuestions / 5) * 5
  preferredNumQuestions = Math.max(Math.min(preferredNumQuestions, maxQuestions), minQuestions)

  const downButton = document.createElement('button')
  const leftArrowIcon = document.createElement('img')
  leftArrowIcon.src = './images/left-arrow.svg'
  leftArrowIcon.alt = 'left arrow'
  downButton.type = 'button'
  downButton.ariaLabel = 'Decrease number of questions'
  downButton.appendChild(leftArrowIcon)

  const numQuestions = document.createElement('input')
  numQuestions.type = 'number'
  numQuestions.min = `${minQuestions}`
  numQuestions.max = `${maxQuestions}`
  numQuestions.step = '5'
  numQuestions.name = 'numQuestions'
  numQuestions.value = `${preferredNumQuestions}`
  numQuestions.readOnly = true
  numQuestions.setAttribute('aria-label', 'Number of questions')

  const upButton = document.createElement('button')
  const rightArrowIcon = document.createElement('img')
  rightArrowIcon.src = './images/right-arrow.svg'
  rightArrowIcon.alt = 'right arrow'
  upButton.type = 'button'
  upButton.ariaLabel = 'Increase number of questions'
  upButton.appendChild(rightArrowIcon)

  downButton.addEventListener('click', () => {
    if (preferredNumQuestions > minQuestions) {
      preferredNumQuestions -= 5
      numQuestions.value = preferredNumQuestions
    }
  })
  upButton.addEventListener('click', () => {
    if (preferredNumQuestions < maxQuestions) {
      preferredNumQuestions += 5
      numQuestions.value = preferredNumQuestions
    }
  })

  parent.appendChild(downButton)
  parent.appendChild(numQuestions)
  parent.appendChild(upButton)

  return parent
}

export default questionsButtonSet
