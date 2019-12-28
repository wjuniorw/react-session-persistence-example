import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
  _id: '',
  nome: '',
  email: '',
})

export const { Types, Creators } = createActions({
  userLogin: ['data'],
  loginSucess: ['data'],
  userSignup: ['params'],
  signupSucess: ['data'],
})

const success = (state = INITIAL_STATE, { data }) => {
  return state.merge(data)
}

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCESS]: success,
  [Types.SIGNUP_SUCESS]: success,
})
