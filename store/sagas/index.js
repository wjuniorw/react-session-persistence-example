import { all, takeLatest } from 'redux-saga/effects'

import {
  login,
  signup,
  logOut,
  loadUser,
} from './session'

function* rootSaga() {
  yield all([
    loadUser(),
    takeLatest('LOGOUT', logOut),
    takeLatest('USER_LOGIN', login),
    takeLatest('USER_SIGNUP', signup),
  ])
}

export default rootSaga
