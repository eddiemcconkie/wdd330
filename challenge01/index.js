import createTodoList from './todo.js'

const listElement = document.getElementById('todoList')
const newTodoForm = document.getElementById('newTodoForm')
const todoInput = document.getElementById('todoInput')
const modeButtons = document.querySelectorAll('.mode-button')
const todoCount = document.getElementById('todoCount')
const list = createTodoList(listElement, 'list')

export const updateTodoCount = (count) => {
  if (count === 1) {
    todoCount.textContent = `1 task left`
  } else {
    todoCount.innerText = `${count} tasks left`
  }
}

modeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const mode = e.target.value
    list.setFilter(mode)
    modeButtons.forEach((button) => {
      const mode = list.getFilter()
      button.classList.toggle('selected', button.value === mode)
    })
  })
})

newTodoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const todo = newTodoForm.elements.todoInput.value.trim()
  todoInput.focus()
  if (todo.length > 0) {
    list.addTodo(todo)
    newTodoForm.reset()
    updateTodoCount(list.numIncomplete())
  }
})

updateTodoCount(list.numIncomplete())
