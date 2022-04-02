import { getCategories } from './api.js'
import { addClass, getLocalStorage } from './utils.js'

const categoryButtonSet = () => {
  const parent = document.createElement('fieldset')
  parent.textContent = 'Loading categories...'
  parent.classList.add('categories')

  getCategories().then((categories) => {
    parent.innerHTML = ''
    categories.forEach((category) => {
      const radio = document.createElement('input')
      const id = `category-${category.id}`
      radio.id = id
      radio.type = 'radio'
      radio.name = 'category'
      radio.value = category.id
      if (category.id == getLocalStorage('category')) {
        radio.checked = true
      }
      const label = document.createElement('label')
      label.textContent = category.name.replace(/.+: /, '')
      label.htmlFor = id
      addClass(label, 'button')
      parent.appendChild(radio)
      parent.appendChild(label)
    })
  })

  return parent
}

export default categoryButtonSet
