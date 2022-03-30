// export const createNavigationButton = (label, onClick) => {
//   const button = document.createElement('button')
//   button.textContent = label
//   button.addEventListener('click', onClick)
//   return button
// }

export const addClass = (element, className) => {
  className.split(' ').forEach((className) => element.classList.add(className))
}

// User preferences and local storage
const prefDefaults = {
  difficulty: 'medium',
  category: '9',
  numQuestions: 10,
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key) => {
  const value = JSON.parse(localStorage.getItem(key))
  return value || prefDefaults[key] || null
}

const viewContainer = document.querySelector('#viewContainer')

export const showView = (view) => {
  viewContainer.style = `--view-position: ${view}`
}

export const createAnswerButton = (answer, i) => {
  const button = document.createElement('button')
  button.type = 'submit'
  button.name = 'answer'
  button.value = i
  button.innerHTML = answer
  button.style = `--delay: ${i / 5}s`
  return button
}
