import View from './view.js'
import { homeView } from './main.js'

export default class Stats extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Stats'
  }

  render() {
    const backButton = this.createNavigationButton('Back', homeView)

    this.createView`<h2>Stats</h2>
      ${backButton}
    `
  }
}
