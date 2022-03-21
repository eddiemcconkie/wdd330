import View from './view.js'
import { homeView, gameView } from './main.js'
import difficultyButtonSet from './difficulty.js'
import categoryButtonSet from './categories.js'
import questionsButtonSet from './questions.js'
import { addClass } from './utils.js'

export default class Settings extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Settings'
  }

  async render() {
    const navButtons = document.createElement('div')
    addClass(navButtons, 'button-container')
    const homeButton = this.createNavigationButton('Back', homeView)
    addClass(homeButton, 'button--secondary button--small')
    const gameButton = this.createNavigationButton('Start', gameView)
    addClass(gameButton, 'button--primary')
    navButtons.appendChild(homeButton)
    navButtons.appendChild(gameButton)

    this.createView`<h2>Difficulty</h2>
      ${difficultyButtonSet()}
      <h2>Categories</h2>
      ${categoryButtonSet()}
      <h2>Questions</h2>
      ${questionsButtonSet()}
      ${navButtons}
    `
  }
}
