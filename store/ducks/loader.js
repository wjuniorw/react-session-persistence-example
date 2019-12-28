import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

const INITIAL_STATE = Immutable({
  loading: false,
})

// actions and types...
export const { Types, Creators } = createActions({
  showLoader: ['data'],
  hideLoader: ['data'],
})

// reducer mutations...
const show = (state = INITIAL_STATE, action) => {
  return state.merge({ loading: true })
}
const hide = (state = INITIAL_STATE, action) => {
  return state.merge({ loading: false })
}

// reducer...
export default createReducer(INITIAL_STATE, {
  [Types.SHOW_LOADER]: show,
  [Types.HIDE_LOADER]: hide,
})
