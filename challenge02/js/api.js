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

// export const getSessionToken = async () => {
//   const storedToken = getLocalStorage('token')
//   if (storedToken) {
//     return storedToken
//   }
//   const response = await fetch(`${baseUrl}?command=request`)
//   const token = await response.json()
//   setLocalStorage('token', token.token)
//   return token.token
// }

export const getQuestions = async (difficulty, category, numQuestions) => {
  const amountResponse = await fetch(`https://opentdb.com/api_count.php?category=${category}`)
  const amountJson = await amountResponse.json()
  const key = `total_${difficulty}_question_count`
  const amount = amountJson['category_question_count'][key]
  const availableQuestions = Math.min(amount, numQuestions)
  const response = await fetch(
    `${baseUrl}?&category=${category}&difficulty=${difficulty}&amount=${availableQuestions}`
  )
  const responseJson = await response.json()
  const questionSet = responseJson.results
  return questionSet
}
