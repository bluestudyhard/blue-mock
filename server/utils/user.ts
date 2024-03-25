import type { user } from '~/types'

export function newUser(username: string, email: string, password: string) {
  const user: user = {
    username,
    avatar: `/avatar/img${Math.floor(Math.random() * 3) + 1}.png`,
    level: 'user',
    password,
    email,
    nickname: '',
  }
  return user
}
