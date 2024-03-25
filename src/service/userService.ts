import type { loginWithToken, user, userLogin, userRegister, userResponse, userWithToken } from '~/types'
import { createService } from '~/utils/request'

const api = {
  register: '/register',
  login: '/login',
  auth: '/auth/',
}
const service = createService(api.auth)

export async function _register(data: userRegister) {
  try {
    const res = await service.post<userWithToken>(api.register, data)
    return res.data
  }
  catch (err) {
    return err
  }
}

export async function _login(data: loginWithToken) {
  //
  try {
    const res = await service.post<userWithToken>(api.login, data)
    console.log(res)
    return res.data
  }
  catch (err) {
    return err
  }
}
