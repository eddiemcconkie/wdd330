import View from './view.js'
import { homeView, gameView } from './main.js'

export default class Settings extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Settings'
  }

  render() {
    this.element.innerHTML = `<h2>Settings</h2>`

    const gameButton = document.createElement('button')
    gameButton.addEventListener('click', () => {
      this.animateTo(gameView)
    })
    gameButton.textContent = 'Start'
    this.element.appendChild(gameButton)

    const homeButton = document.createElement('button')
    homeButton.addEventListener('click', () => {
      this.animateTo(homeView)
    })
    homeButton.textContent = 'Back'
    this.element.appendChild(homeButton)
  }
}
