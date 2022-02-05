import { readLocalStorage, writeLocalStorage } from './utils.js'

const createTodo = (name) => {
  return {
    id: new Date(),
    name,
    completed: false,
  }
}

const createTodoList = (element, key) => {
  // Private
  let data = readLocalStorage(key) || []
  let filterMode = 'all'

  const renderList = () => {
    let filtered = data
    if (filterMode === 'active') {
      filtered = data.filter((todo) => !todo.completed)
    } else if (filterMode === 'completed') {
      filtered = data.filter((todo) => todo.completed)
    }

    element.innerHTML = ''
    filtered.forEach((todo) => {
      const li = document.createElement('li')
      const checkbox = document.createElement('button')
      const title = document.createTextNode(todo.name)
      const remove = document.createElement('button')
      checkbox.textContent = todo.completed ? '-' : ' +'
      remove.textContent = 'X'
      li.appendChild(checkbox)
      li.appendChild(title)
      li.appendChild(remove)

      checkbox.addEventListener('click', (e) => {
        todo.completed = !todo.completed
        writeLocalStorage(key, data)
        renderList()
      })
      remove.addEventListener('click', (e) => {
        data = data.filter((t) => t.id !== todo.id)
        writeLocalStorage(key, data)
        renderList()
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

  const filter = (mode) => {
    if (['all', 'active', 'completed'].includes(mode)) {
      filterMode = mode
    }
    renderList()
  }

  const clear = () => {
    data = []
    writeLocalStorage(key, data)
    renderList()
  }

  return {
    addTodo,
    filter,
    clear,
  }
}

export default createTodoList
