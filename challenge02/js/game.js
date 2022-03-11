import View from './view.js'
import { settingsView } from './main.js'

export default class Game extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Game'
  }

  render() {
    this.element.innerHTML = `<h2>Game</h2>`

    const button = document.createElement('button')
    button.addEventListener('click', () => {
      this.animateTo(settingsView)
    })
    button.textContent = 'Quit'
    this.element.appendChild(button)
  }
}
