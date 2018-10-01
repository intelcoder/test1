export const browserStorage = () => ((typeof localStorage === 'undefined') ? {
  setItem: () => {},
  getItem: () => {},
  removeItem: () => {},
} : localStorage)
