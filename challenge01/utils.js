export const readLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
export const writeLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}
