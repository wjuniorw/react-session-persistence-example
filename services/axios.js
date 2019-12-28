import axios from 'axios'
import store from '../store'
import { Types as Loader } from '../store/ducks/loader'

const baseURL = 'http://192.168.100.102:5000/api'

const myApi = axios.create({ baseURL })
// Add tokens on request ...
myApi.interceptors.request.use(
  async config => {
    store.dispatch({ type: Loader.SHOW_LOADER })
    const userToken = await localStorage.getItem('myApp@token')
    const refreshToken = await localStorage.getItem('myApp@refreshToken')
    const login = config.url.endsWith('login')
    const signup = config.url.endsWith('signup')

    let withAuth = config
    let withoutAuth = config

    if (!login && !signup) {
      withAuth.headers['auth-token'] = userToken
      withAuth.headers['refresh-token'] = refreshToken
      return withAuth
    }
    if (login) {
      return withoutAuth
    }
    if (signup) {
      return withoutAuth
    }
  },
  error => {
    // console.log('beforeware error...', error)
    store.dispatch({ type: Loader.HIDE_LOADER })
    return Promise.reject(error)
  }
)

// Replace tokens on response
myApi.interceptors.response.use(
  response => {
    const newToken = response.headers['auth-token']
    const newRefreshToken = response.headers['refresh-token']
    if (newToken) {
      localStorage.setItem('myApp@token', newToken)
      localStorage.setItem('myApp@refreshToken', newRefreshToken)
    }
    store.dispatch({ type: Loader.HIDE_LOADER })
    return response
  },
  function(error) {
    const { status } = error.response || { status: 400 }
    if (status === 401) {
      store.dispatch({ type: 'LOGOUT' })
    }
    store.dispatch({ type: Loader.HIDE_LOADER })
    // Do something with response error
    return Promise.reject(error)
  }
)

export default myApi
