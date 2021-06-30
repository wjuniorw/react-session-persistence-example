import { call, put, select, take } from 'redux-saga/effects';

import { login as tryLogin, signup as register } from './apiCalls';

import { Creators as User } from '../ducks/user';
import { Types, Creators as Session } from '../ducks/session';

export function* login({ data }) {
  try {
    const { data: resp } = yield call(tryLogin, data);
    const { token, refreshToken, ...user } = resp;
    const res = { ...user, token, refreshToken };
    yield localStorage.setItem('MyApp@User', JSON.stringify(user));
    yield localStorage.setItem('MyApp@token', token);
    yield localStorage.setItem('MyApp@refreshToken', refreshToken);
    yield put(User.loginSucess(res));
    yield put(Session.logIn());
  } catch (err) {
    console.log('catch message...', err.message);
    if (!err.response) alert('Erro de conexão');
    if (err.response) {
      const {
        response: { data }
      } = err;
      yield alert('Erro', data.msg);
    }
  }
}

export function* loadUser() {
  yield take(Types.LOAD_USER);
  try {
    const user = yield localStorage.getItem('MyApp@User');
    let data = yield JSON.parse(user);
    console.log('user on localStorage...', data);
    if (!!data) {
      yield put(User.loginSucess(data));
      yield put({ type: 'LOG_IN' });
    }
  } catch (err) {
    console.log(err.message);
    // yield put({ type: Loader.HIDE_LOADER })
  }
}
export function* logOut() {
  // yield take('LOGOUT')
  console.log('saga logOut()');
  try {
    yield localStorage.removeItem('MyApp@User');
    yield localStorage.removeItem('MyApp@token');
    yield localStorage.removeItem('MyApp@refreshToken');
    yield put({ type: 'LOG_OUT' });
  } catch (err) {
    // console.log('catch LOGOUT saga', err.message)
    // console.log('catch LOGOUT saga', err)
  }
}

export function* signup({ params }) {
  try {
    const {
      data: { msg, user, token }
    } = yield call(register, params);
    yield localStorage.setItem('MyApp@User', JSON.stringify(user));
    yield localStorage.setItem('MyApp@token', token);
    yield put({ type: Types.LOGIN_SUCESS, data: user });
    yield put({ type: 'LOG_IN' });
  } catch (err) {
    // console.tronlog('error signup', err.message)
    if (!err.response) alert('Erro de conexão');
    if (err.response) {
      const {
        response: { data }
      } = err;
      // console.tronlog('error signup response', data)
      if (data.length) {
        const messages = data.map(it => `${it.msg}. `).join('\n');
        yield Alert.alert('Campos inválidos', messages);
      } else {
        yield alert('Erro interno');
      }
    }
  }
}
