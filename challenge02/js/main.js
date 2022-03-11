import Stats from './stats.js'
import Home from './home.js'
import Settings from './settings.js'
import Game from './game.js'

const statsElement = document.querySelector('#stats')
export const statsView = new Stats(statsElement, 0)
const homeElement = document.querySelector('#home')
export const homeView = new Home(homeElement, 1)
const settingsElement = document.querySelector('#settings')
export const settingsView = new Settings(settingsElement, 2)
const gameElement = document.querySelector('#game')
export const gameView = new Game(gameElement, 3)

setTimeout(() => {
  homeView.render()
  homeView.animate('fade-in-bottom')
}, 500)
