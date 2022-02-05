import createTodoList from './todo.js'

const listElement = document.getElementById('todoList')
const list = createTodoList(listElement, 'list')
const newTodoForm = document.getElementById('newTodoForm')

document.querySelectorAll('.modeButton').forEach((button) => {
  button.addEventListener('click', (e) => {
    const mode = e.target.value
    list.filter(mode)
  })
})

newTodoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const todo = newTodoForm.elements.todo.value.trim()
  list.addTodo(todo)
  newTodoForm.reset()
})
