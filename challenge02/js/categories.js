import { getCategories } from './api.js'
import { getLocalStorage, setLocalStorage } from './utils.js'

const categoryButtonSet = () => {
  const parent = document.createElement('div')
  parent.textContent = 'Loading categories...'
  parent.classList.add('categories')
  // let currentCategory = getLocalStorage('category')

  const setSelected = (category) => {
    Array.from(parent.children).forEach((button) => {
      button.classList.toggle('selected', button.value == category)
      if (button.value == category) {
        // scroll horizontally to button
        const buttonRect = button.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()
        // if on a large screen, scroll item to center horizontally
        if (window.innerWidth >= 768) {
          const parentWidth = parent.clientWidth
          const itemWidth = button.clientWidth
          const scrollLeft = buttonRect.left - parentRect.left - parentWidth / 2 + itemWidth / 2
          parent.scrollLeft += scrollLeft
        } else {
          const scrollLeft = buttonRect.left - parentRect.left
          parent.scrollLeft += scrollLeft
        }
      }
    })
  }

  getCategories().then((categories) => {
    parent.innerHTML = ''
    categories.forEach((category) => {
      const button = document.createElement('button')
      // Remove anything up to the colon if there is one, such as "Entertainment: "
      button.textContent = category.name.replace(/.+: /, '')
      button.value = category.id
      button.addEventListener('click', () => {
        setLocalStorage('category', category.id)
        setSelected(category.id)
      })
      parent.appendChild(button)
    })
    const category = getLocalStorage('category')
    parent.style.scrollBehavior = 'auto'
    setSelected(category)
    parent.style.scrollBehavior = 'smooth'
  })

  return parent
}

export default categoryButtonSet
