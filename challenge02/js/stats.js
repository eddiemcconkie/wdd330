import View from './view.js'
import { homeView } from './main.js'
import Home from './home.js'

export default class Stats extends View {
  // static screenPosition = 0

  constructor(...args) {
    super(...args)
    this.title = 'Stats'
  }

  render() {
    const backButton = this.createNavigationButton('Back', homeView)
    // const backButton = this.createNavigationButton('Back', Home)

    this.createView`<h2>Stats</h2>
      ${backButton}
    `
  }
}
