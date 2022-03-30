import View from './view.js'
import { settingsView, statsView } from './main.js'
import { addClass } from './utils.js'
import Settings from './settings.js'
import Stats from './stats.js'

export default class Home extends View {
  // static screenPosition = 1

  constructor(...args) {
    super(...args)
    this.title = 'Home'
  }

  render() {
    const playButton = this.createNavigationButton('Play', settingsView)
    // const playButton = this.createNavigationButton('Play', Settings)
    addClass(playButton, 'button--primary')
    const statsButton = this.createNavigationButton('Stats', statsView)
    // const statsButton = this.createNavigationButton('Stats', Stats)
    addClass(statsButton, 'button--secondary')

    this.createView`<h1>Trivia Game</h1>
      ${playButton}
      ${statsButton}
    `
  }
}
