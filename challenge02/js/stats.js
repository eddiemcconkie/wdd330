import View from './view.js'
import { homeView } from './main.js'

export default class Stats extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Stats'
  }

  render() {
    this.element.innerHTML = '<h2>Stats</h2>'

    const button = document.createElement('button')
    button.addEventListener('click', () => {
      this.animateTo(homeView)
    })
    button.textContent = 'Back'
    this.element.appendChild(button)
  }
}
