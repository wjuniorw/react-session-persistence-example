import Api from '../../services/api'

export const login = user => Api.login(user)
export const signup = user => Api.signup(user)
