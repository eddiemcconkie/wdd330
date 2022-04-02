import View from './view.js'
import { homeView, gameView } from './main.js'
import difficultyButtonSet from './difficulty.js'
import categoryButtonSet from './categories.js'
import questionsButtonSet from './questions.js'
import { addClass, setLocalStorage } from './utils.js'

export default class Settings extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Settings'
  }

  render() {
    const navButtons = document.createElement('div')
    addClass(navButtons, 'button-container')
    const homeButton = this.createNavigationButton('Back', homeView)
    addClass(homeButton, 'button--secondary button--small')
    // const gameButton = this.createNavigationButton('Start', gameView)
    const gameButton = document.createElement('button')
    gameButton.textContent = 'Start'
    addClass(gameButton, 'button--primary')
    homeButton.type = 'button'
    gameButton.type = 'submit'

    navButtons.appendChild(homeButton)
    navButtons.appendChild(gameButton)
    addClass(navButtons, 'bottom')

    this.createView`<h2>Difficulty</h2>
      ${difficultyButtonSet()}
      <h2>Categories</h2>
      ${categoryButtonSet()}
      <h2>Questions</h2>
      ${questionsButtonSet()}
      ${navButtons}
    `

    this.element.addEventListener('submit', (e) => {
      e.preventDefault()
      const form = e.target
      const difficulty = form.difficulty.value
      const category = form.category.value
      const numQuestions = form.numQuestions.value
      setLocalStorage('difficulty', difficulty)
      setLocalStorage('category', category)
      setLocalStorage('numQuestions', numQuestions)
      this.animateTo(gameView)
    })
  }
}
