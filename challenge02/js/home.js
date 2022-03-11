import View from './view.js'
import { settingsView, statsView } from './main.js'

export default class Home extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Home'
  }

  render() {
    this.element.innerHTML = '<h1>Trivia Game</h1>'

    const button = document.createElement('button')
    button.addEventListener('click', () => {
      this.animateTo(settingsView)
    })
    button.textContent = 'Play'
    this.element.appendChild(button)

    // const gameButton = document.createElement('button')
    // gameButton.addEventListener('click', () => {
    //   this.animateTo(gameView)
    // })
    // gameButton.textContent = 'Go to Game'
    // this.element.appendChild(gameButton)

    const statsButton = document.createElement('button')
    statsButton.addEventListener('click', () => {
      this.animateTo(statsView)
    })
    statsButton.textContent = 'Stats'
    this.element.appendChild(statsButton)
  }
}
