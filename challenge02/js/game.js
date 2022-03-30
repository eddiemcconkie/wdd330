import View from './view.js'
import Settings from './settings.js'
import { addClass, createAnswerButton, getLocalStorage } from './utils.js'
import { getQuestions } from './api.js'
import { settingsView } from './main.js'

export default class Game extends View {
  // static screenPosition = 3

  constructor(...args) {
    super(...args)
    this.title = 'Game'
  }

  render() {
    const quitButton = this.createNavigationButton('Quit', settingsView)
    // const quitButton = this.createNavigationButton('Quit', Settings)

    this.header = document.createElement('h2')
    this.questionDisplay = document.createElement('p')
    this.answerDisplay = document.createElement('div')

    this.createView`
      ${this.header}
      ${this.questionDisplay}
      ${this.answerDisplay}
      ${quitButton}
    `

    this.questionDisplay.innerHTML = 'Loading...'
    addClass(this.questionDisplay, 'question-display')
    addClass(this.answerDisplay, 'answer-display')

    // this.answerDisplay.addEventListener('submit', (e) => {
    this.answerDisplay.addEventListener('click', (e) => {
      // e.preventDefault()
      const target = e.target
      if (target.tagName === 'BUTTON') {
        this.answerDisplay.style.pointerEvents = 'none'

        const answer = target.value
        if (answer == this.correctAnswer) {
          addClass(target, 'correct-answer')
          this.score += 1
        } else {
          addClass(target, 'incorrect-answer')
          const correctButton = this.answerDisplay.querySelector(
            `button:nth-child(${this.correctAnswer + 1})`
          )
          addClass(correctButton, 'correct-answer')
        }

        setTimeout(() => {
          this.questionDisplay.innerHTML = ''
          this.answerDisplay.innerHTML = ''
          this.answerDisplay.style.pointerEvents = 'auto'
          if (this.questions.length) {
            this.nextQuestion()
          } else {
            this.showScore()
          }
        }, 1000)
      }
    })
  }

  async init() {
    const difficulty = getLocalStorage('difficulty')
    const category = getLocalStorage('category')
    const numQuestions = getLocalStorage('numQuestions')

    const categories = getLocalStorage('categories')
    const categoryName = categories.find((c) => c.id === category).name.replace(/.+: /, '')
    this.header.textContent = `${categoryName} - ${difficulty}`

    this.questions = await getQuestions(difficulty, category, numQuestions)
    // console.table(this.questions)
    this.score = 0
    this.total = this.questions.length
    this.nextQuestion()
  }

  exit() {
    this.questions = null
    this.currentQuestion = null
    this.correctAnswer = null
    this.score = null
    this.total = null
    this.header.innerHTML = ''
    this.questionDisplay.innerHTML = ''
    this.answerDisplay.innerHTML = ''
  }

  nextQuestion() {
    this.currentQuestion = this.questions.shift()
    this.questionDisplay.innerHTML = this.currentQuestion.question
    const answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
    const answersShuffled = answers.sort(() => Math.random() - 0.5)
    answersShuffled.forEach((answer, i) => {
      const button = createAnswerButton(answer, i)
      this.answerDisplay.appendChild(button)
      if (answer === this.currentQuestion.correct_answer) {
        this.correctAnswer = i
      }
    })
  }

  showScore() {
    const messages = ['Sorry!', 'Bummer!', 'Keep trying!', 'Not bad!', 'Great job!', 'Amazing!']
    const outOfFive = Math.round((this.score / this.total) * 5)
    this.questionDisplay.innerHTML = `<strong class="score-message">${messages[outOfFive]}</strong><br/>You got ${this.score} / ${this.total} correct`
  }
}
