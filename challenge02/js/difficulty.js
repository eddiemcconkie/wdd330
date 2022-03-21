import { getLocalStorage, setLocalStorage } from './utils.js'

const difficultyButtonSet = () => {
  const parent = document.createElement('div')
  const difficulties = ['easy', 'medium', 'hard']
  parent.classList.add('difficulties')

  const setSelected = (difficulty) => {
    Array.from(parent.children).forEach((button) => {
      button.classList.toggle('selected', button.textContent === difficulty)
    })
  }

  difficulties.forEach((difficulty) => {
    const button = document.createElement('button')
    button.textContent = difficulty
    button.addEventListener('click', () => {
      setLocalStorage('difficulty', difficulty)
      setSelected(difficulty)
    })
    parent.appendChild(button)
  })

  const preferredDifficulty = getLocalStorage('difficulty')
  setSelected(preferredDifficulty)

  return parent
}

export default difficultyButtonSet
