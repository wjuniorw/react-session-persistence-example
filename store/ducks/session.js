import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
  logedIn: false,
  firstRun: true,
})

export const { Types, Creators } = createActions({
  logIn: ['data'],
  logOut: ['data'],
  logout: ['data'],
  ready: ['data'],
  loadUser: ['data'],
})
const logIn = (state = INITIAL_STATE) => {
  return state.merge({ logedIn: true, firstRun: false })
}
const logOut = (state = INITIAL_STATE) => {
  return state.merge({ logedIn: false, firstRun: true })
}
const firstRun = (state = INITIAL_STATE) => {
  return state.merge({ firstRun: false })
}

export default createReducer(INITIAL_STATE, {
  [Types.LOG_IN]: logIn,
  [Types.LOG_OUT]: logOut,
  [Types.READY]: firstRun,
})
