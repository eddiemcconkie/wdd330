import View from './view.js'
import { settingsView } from './main.js'

export default class Game extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Game'
  }

  render() {
    const quitButton = this.createNavigationButton('Quit', settingsView)

    this.createView`<h2>Game</h2>
      ${quitButton}
    `
  }
}
