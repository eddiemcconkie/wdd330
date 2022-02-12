import { readLocalStorage, writeLocalStorage } from './utils.js'
import { updateTodoCount } from './index.js'

const createTodo = (name) => {
  return {
    id: new Date().getTime(),
    name,
    completed: false,
  }
}

const createTodoList = (element, key) => {
  // Private
  let data = readLocalStorage(key) || []
  let filterMode = 'all'

  const numIncomplete = () => data.reduce((count, todo) => (!todo.completed ? count + 1 : count), 0)

  const renderList = () => {
    let filtered = data
    if (filterMode === 'active') {
      filtered = data.filter((todo) => !todo.completed)
    } else if (filterMode === 'completed') {
      filtered = data.filter((todo) => todo.completed)
    }

    element.innerHTML = ''
    if (data.length == 0) {
      element.innerHTML = `<em class="message">You don’t have any To-Do’s</em>`
    } else if (filtered.length == 0) {
      element.innerHTML = `<em class="message">No ${filterMode} To-Do’s</em>`
    }
    filtered.forEach((todo) => {
      const li = document.createElement('li')
      const checkbox = document.createElement('input')
      const title = document.createElement('label')
      const remove = document.createElement('button')
      checkbox.id = todo.id
      checkbox.type = 'checkbox'
      checkbox.checked = todo.completed
      title.setAttribute('for', todo.id)
      title.textContent = todo.name
      remove.innerHTML = '&times;'
      li.classList.add('todo')
      checkbox.classList.add('todo-checkbox')
      title.classList.add('todo-title')
      remove.classList.add('todo-remove')
      li.appendChild(checkbox)
      li.appendChild(title)
      li.appendChild(remove)

      checkbox.addEventListener('change', (e) => {
        todo.completed = !todo.completed
        writeLocalStorage(key, data)
        renderList()
        updateTodoCount(numIncomplete())
      })
      remove.addEventListener('click', (e) => {
        data = data.filter((t) => t.id !== todo.id)
        writeLocalStorage(key, data)
        renderList()
        updateTodoCount(numIncomplete())
      })

      element.appendChild(li)
    })
  }

  renderList()

  // Public
  const addTodo = (name) => {
    data.push(createTodo(name))
    writeLocalStorage(key, data)
    renderList()
  }

  const setFilter = (mode) => {
    if (['all', 'active', 'completed'].includes(mode)) {
      filterMode = mode
    }
    renderList()
  }

  const getFilter = () => filterMode

  const clear = () => {
    data = []
    writeLocalStorage(key, data)
    renderList()
  }

  return {
    addTodo,
    setFilter,
    getFilter,
    clear,
    numIncomplete,
  }
}

export default createTodoList
