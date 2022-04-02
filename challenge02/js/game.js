import View from './view.js'
import { addClass, createAnswerButton, getLocalStorage } from './utils.js'
import { getQuestions } from './api.js'
import { settingsView } from './main.js'

export default class Game extends View {
  constructor(...args) {
    super(...args)
    this.title = 'Game'
  }

  render() {
    this.quitButton = this.createNavigationButton('&laquo; Quit', settingsView)
    addClass(this.quitButton, 'button--naked align-vertical-bottom')

    this.header = document.createElement('h2')
    this.questionDisplay = document.createElement('p')
    this.answerDisplay = document.createElement('div')

    this.createView`
      ${this.header}
      ${this.questionDisplay}
      ${this.answerDisplay}
      ${this.quitButton}
    `

    this.questionDisplay.innerHTML = 'Loading...'
    addClass(this.questionDisplay, 'question-display')
    addClass(this.answerDisplay, 'answer-display')

    this.answerDisplay.addEventListener('click', (e) => {
      const target = e.target
      if (target.tagName === 'BUTTON') {
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

        this.showAnswer()
      }
    })
  }

  showAnswer() {
    clearInterval(this.interval)
    this.answerDisplay.style.pointerEvents = 'none'

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

  async init() {
    const difficulty = getLocalStorage('difficulty')
    const category = getLocalStorage('category')
    const numQuestions = getLocalStorage('numQuestions')

    const categories = getLocalStorage('categories')
    const categoryName = categories.find((c) => c.id == category).name.replace(/.+: /, '')
    this.header.textContent = `${categoryName} - ${difficulty}`
    this.questionDisplay.style = `--timer-width: 0%`

    this.questions = await getQuestions(difficulty, category, numQuestions)
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
    clearInterval(this.interval)
    this.questionDisplay.style = `--timer-width: 0%`
    this.quitButton.innerHTML = '&laquo; Quit'
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

    let timer = 10
    this.questionDisplay.style = `--timer-width: 100%`
    this.interval = setInterval(() => {
      timer--
      // this.questionDisplay.style = `--timer: ${timer}`
      this.questionDisplay.style = `--timer-width: ${timer * 10}%`
      if (timer === 0) {
        const correctButton = this.answerDisplay.querySelector(
          `button:nth-child(${this.correctAnswer + 1})`
        )
        addClass(correctButton, 'correct-answer')
        this.showAnswer()
      }
    }, 1000)
  }

  showScore() {
    const messages = ['Sorry!', 'Bummer!', 'Keep trying!', 'Not bad!', 'Great job!', 'Amazing!']
    const outOfFive = Math.round((this.score / this.total) * 5)
    this.questionDisplay.innerHTML = `<strong class="score-message">${messages[outOfFive]}</strong><br/>You got ${this.score} / ${this.total} correct`
    this.questionDisplay.style = `--timer-width: 0%`
    this.quitButton.innerHTML = '&laquo; Back'
  }
}
