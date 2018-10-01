import { REQUEST, SUCCESS, FAILURE } from './constants'


export const actionCreator = (type, payload = {}) =>
  ({ type, ...payload })


export const createRequestTypes = (base) => {
  const cases = [REQUEST, SUCCESS, FAILURE]
  return cases.reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}


export const createApiActions = (type) => ({
  request: (data) => ({ type: type[REQUEST], ...data }),
  success: (defaults, response) => ({ type: type[SUCCESS], defaults, response }),
  failure: (defaults, error) => ({ type: type[FAILURE], defaults, error }),
})
