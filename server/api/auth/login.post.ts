import type { RowDataPacket } from 'mysql2'
import db from '~~/database'
import type { loginWithToken } from '~/types'
import { getUser } from '~~/database/queries/user'

export default defineEventHandler(async (event) => {
  const { username, password, token } = await readBody<loginWithToken>(event)
  console.log('login', username, password, token)
  // 如果用户名或密码为空
  if (!username || !password) {
    return createError({
      message: '用户名或密码不能为空',
      status: 400,
    })
  }
  // 检验用户名和密码是否正确
  const [user] = await db.query<RowDataPacket[]>(getUser, [username, password])
  console.log('user', user)
  if (user.length === 0) {
    return {
      error: '用户名或密码错误',
      status: 400,
    }
  }
  // 检查token是否过期
  let tokenData = verifyJwt(token)
  // console.log('tokenData', tokenData)

  if (!tokenData) {
    console.log('token过期')
    tokenData = getJwt(user[0].id)
  }
  else { tokenData = token }
  console.log('tokenData', tokenData)
  return {
    data: {
      token: tokenData,
      user: user[0],
    },
    status: 202,
  }
})
