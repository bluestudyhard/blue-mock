import jsonwebtoken from 'jsonwebtoken'

const {
  USER_TOKEN_SECRET: userSecret,
} = process.env

export function getJwt() {
  let jwt = ''
  const data = {}
  jwt = jsonwebtoken.sign(data, userSecret!, { expiresIn: '1d' })
  return jwt
}
