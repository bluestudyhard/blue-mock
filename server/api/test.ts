import { getJwt } from '../utils/jwt'

export default defineEventHandler(async () => {
  const jwt = getJwt()
  return {

    hello: 'world',
    jwt,
  }
})
