import { combineReducers } from 'redux'
import { resettableReducer } from 'reduxsauce'

import session from './session'
import loader from './loader'
import user from './user'

import midd from './middle'

const resetable = resettableReducer('LOG_OUT')

const reducers = combineReducers({ session, loader, user: resetable(user), midd, })

export default reducers