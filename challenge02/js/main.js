import Stats from './stats.js'
import Home from './home.js'
import Settings from './settings.js'
import Game from './game.js'
import { showView } from './utils.js'

const statsElement = document.querySelector('#stats')
export const statsView = new Stats(statsElement, 0)
const homeElement = document.querySelector('#home')
export const homeView = new Home(homeElement, 1)
const settingsElement = document.querySelector('#settings')
export const settingsView = new Settings(settingsElement, 2)
const gameElement = document.querySelector('#game')
export const gameView = new Game(gameElement, 3)

const views = [homeView, settingsView, statsView, gameView]
views.forEach((view) => {
  view.render()
})
showView(1)
// setTimeout(() => {
// statsView.render()
// homeView.render()
homeView.animate('fade-in-bottom')
// settingsView.render()
// gameView.render()
// }, 0)
// gameView.init()
