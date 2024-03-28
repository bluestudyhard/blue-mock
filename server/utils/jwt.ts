import jsonwebtoken from 'jsonwebtoken'

const {
  USER_TOKEN_SECRET: userSecret,
} = process.env

export function getJwt(userId: number) {
  let jwt = ''
  const playLoad = {
    userId,
  }

  jwt = jsonwebtoken.sign(playLoad, userSecret!, { expiresIn: '2 days' })
  return jwt
}
// 验证jwt，如果验证通过返回数据，否则返回false
export function verifyJwt(token: string) {
  try {
    const data = jsonwebtoken.verify(token, userSecret!)
    console.log('校验jwt', data)
    return data
  }
  catch (error) {
    return false
  }
}

// 更新jwt 分享文档编辑权限
export function updateJwt(data: any) {
  let jwt = ''
  jwt = jsonwebtoken.sign(data, userSecret!, { expiresIn: '2 days' })
  return jwt
}
