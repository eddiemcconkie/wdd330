'use strict'

import { showView } from './utils.js'

export default class View {
  constructor(element, position) {
    // The parent element of the view
    this.element = element
    // The position of the view relative to the other views, used for animation purposes
    this.position = position
  }

  init() {}

  exit() {}

  animate(animation, hideOnEnd = false) {
    // Add the class to trigger the animation
    this.element.classList.add(animation)
    // this.element.classList.add('open')
    this.element.classList.toggle('open', !hideOnEnd)
    // Disable pointer events to prevent the user from clicking while animating
    // this.element.style.pointerEvents = 'none'

    this.element.onanimationend = () => {
      this.element.classList.remove(animation)
      // this.element.style.pointerEvents = 'auto'
      hideOnEnd && this.hide()
      // hideOnEnd && this.element.classList.remove('open')
    }
  }

  animateTo(nextView) {
    // nextView.render()
    // // Use the view positions to determine the direction of the animation
    // if (nextView.position > this.position) {
    //   this.animate('slide-out-left', true)
    //   nextView.animate('slide-in-right')
    // } else {
    //   this.animate('slide-out-right', true)
    //   nextView.animate('slide-in-left')
    // }
    this.exit()
    showView(nextView.position)
    nextView.init()
  }

  hide() {
    this.element.innerHTML = ''
  }

  createView(html, ...elements) {
    html.forEach((string, i) => {
      this.element.insertAdjacentHTML('beforeend', string)
      i < elements.length && this.element.insertAdjacentElement('beforeend', elements[i])
    })
  }

  createNavigationButton = (label, nextView) => {
    const button = document.createElement('button')
    button.textContent = label
    button.addEventListener('click', () => {
      this.animateTo(nextView)
      // showView(nextView.screenPosition)
    })

    return button
  }
}
