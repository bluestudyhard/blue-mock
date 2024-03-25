import type { RowDataPacket } from 'mysql2'
import db from '~~/database'
import type { userLogin, userRegister, userWithToken } from '~/types'
import { addUser, findUser, getUserId } from '~~/database/queries/user'
import { newUser } from '~~/server/utils/user'

export default defineEventHandler(async (event) => {
  const { email, username, password } = await readBody<userRegister>(event)
  console.log(email, username, password)
  // 如果用户名或密码为空
  if (!email || !password || !username) {
    return {
      error: '用户名或密码不能为空',
      status: 400,
    }
  }

  // 查询是否存在用户，如果存在则返回错误
  const [user] = await db.query<RowDataPacket[]>(findUser, { email })
  if (user.length > 0) {
    return {
      error: '用户已存在',
      status: 400,
    }
  }

  // 如果没有用户，直接注册并登录
  const _user = newUser(username, email, password)

  // 将用户信息写入数据库
  await db.query<RowDataPacket[]>(addUser, [
    _user.username,
    _user.password,
    _user.nickname,
    _user.email,
    _user.avatar,
    _user.level,
  ])
  // 拿到用户的id
  const [id] = await db.query<RowDataPacket[]>(getUserId, _user.username)
  // 为新用户添加token jwt
  // console.log(id[0].id)
  const token = getJwt(id[0].id)
  console.log(token)
  return {
    status: 202,
    data: {
      user: {
        username: _user.username,
        nickname: _user.nickname,
        level: _user.level,
        email: _user.email,
        avatar: _user.avatar,
      },
      token,

    } as userWithToken,
  }
})
