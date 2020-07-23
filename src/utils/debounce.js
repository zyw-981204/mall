export function debounce (func, delay = 50) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      if (!func) {
      } else {
        func.apply(this, args)
      }
    }, delay)
  }
}