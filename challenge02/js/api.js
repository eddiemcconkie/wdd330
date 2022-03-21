import { getLocalStorage, setLocalStorage } from './utils.js'

// open trivia database api
const baseUrl = 'https://opentdb.com/api.php'

export const getCategories = async () => {
  const storedCategories = getLocalStorage('categories')
  if (storedCategories) {
    return storedCategories
  }
  const response = await fetch('https://opentdb.com/api_category.php')
  const categories = await response.json()
  setLocalStorage('categories', categories.trivia_categories)
  return categories.trivia_categories
}
