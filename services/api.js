// import Api from './axios'
// import store from '../store'

class MyApi {
  static login(data) {
    // return Api.post('/login', data)
      return { data: {
        _id: '1ds3f13sfs1s3',
        name: 'Guest user',
        email: 'guest@mail.com',
        token: 'token,lgfdg4564f564gf5d64g564fdg45fd46',
        refreshToken: 'refreshToken,lgfdg4564f564gf5d64g564fdg45fd46'
        }
      }
  }
  static signup(data) {
    // return Api.post('/users', data)
      return { data: {
        _id: '1ds3f13sfs1s3',
        name: 'guest user',
        email: 'guest@mail.com',
        token: 'token,lgfdg4564f564gf5d64g564fdg45fd46',
        refreshToken: 'refreshToken,lgfdg4564f564gf5d64g564fdg45fd46'
        }
      }
  }
}

export default MyApi
