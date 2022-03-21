import View from './view.js'
import { settingsView, statsView } from './main.js'
import { addClass } from './utils.js'

export default class Home extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Home'
  }

  render() {
    const playButton = this.createNavigationButton('Play', settingsView)
    addClass(playButton, 'button--primary')
    const statsButton = this.createNavigationButton('Stats', statsView)
    addClass(statsButton, 'button--secondary')

    this.createView`<h1>Trivia Game</h1>
      ${playButton}
      ${statsButton}
    `
  }
}
