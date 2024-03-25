import { createPool } from 'mysql2/promise'

const {
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_SSL,
} = process.env

const ssl = MYSQL_SSL === 'true'
  ? {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    }
  : undefined

export const db = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: Number.parseInt(MYSQL_PORT!),
  connectTimeout: 8 * 1000,
  ssl,
})
export default db
