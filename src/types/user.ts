import type { RowDataPacket } from 'mysql2'

export type uid = number

export type Level = 'admin' | 'user'

export interface userLogin {
  username: string
  password: string
}
export interface userRegister {
  email: string
  password: string
  username: string
}
export interface user {
  id?: uid
  username: string
  nickname?: string
  password: string
  level: Level
  email: string
  avatar: string
}

export interface userDisplay {
  id?: uid
  username: string
  nickname?: string
  level: Level
  email: string
  avatar: string
}
export interface userWithToken {
  user: Omit<user, 'password'>
  token: tokenType
  status: number
}
export interface userResponse {
  data: userWithToken
  status: number
}
export interface loginWithToken extends userLogin {
  token: string
}

export type tokenType = string | { userId: string, iat: number, exp: number }
