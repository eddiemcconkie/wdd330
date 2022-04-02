import { addClass, getLocalStorage } from './utils.js'

const difficultyButtonSet = () => {
  const parent = document.createElement('fieldset')
  const difficulties = ['easy', 'medium', 'hard']
  parent.classList.add('difficulties')

  difficulties.forEach((difficulty) => {
    const radio = document.createElement('input')
    const id = `difficulty-${difficulty}`
    radio.id = id
    radio.type = 'radio'
    radio.name = 'difficulty'
    radio.value = difficulty

    if (difficulty === getLocalStorage('difficulty')) {
      radio.checked = true
    }

    const label = document.createElement('label')
    label.htmlFor = id
    label.textContent = difficulty
    addClass(label, 'button')

    parent.appendChild(radio)
    parent.appendChild(label)
  })

  return parent
}

export default difficultyButtonSet
