import { REQUEST, SUCCESS, FAILURE } from './constants'
import { actionCreator, createRequestTypes } from './index'

export const LOAD_DEFAULTS_DATA = 'LOAD_DEFAULTS_DATA'
export const loadDefaultsData = () => actionCreator(LOAD_DEFAULTS_DATA)


export const DEFAULTS_DATA = createRequestTypes('DEFAULTS_DATA')
export const getDefaultsAction = {
  request: () => actionCreator(DEFAULTS_DATA[REQUEST]),
  success: (defaults, response) => actionCreator(DEFAULTS_DATA[SUCCESS], { response }),
  failure: (defaults, error) => actionCreator(DEFAULTS_DATA[FAILURE], { error }),
}
