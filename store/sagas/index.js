import { all, takeLatest } from 'redux-saga/effects';

import { Types as Session } from '../ducks/session';
import { Types as User } from '../ducks/user';
import { login, signup, logOut, loadUser } from './session';

function* rootSaga() {
  yield all([
    loadUser(),
    takeLatest(Session.LOGOUT, logOut),
    takeLatest(User.USER_LOGIN, login),
    takeLatest(User.USER_SIGNUP, signup)
  ]);
}

export default rootSaga;
