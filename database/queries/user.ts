const table = 't_user_info'

// 添加user
export const addUser = `INSERT INTO ${table} (username, password, nickname, email, avatar, level) VALUES (?, ?, ?, ?, ?, ?)`
// 获取所有的user
export const getAllUser = `SELECT * FROM ${table}`
// 获取指定id的user
export const getUserById = `SELECT * FROM ${table} WHERE id = ?`
// 设置user的权限
export const setUserLevel = `UPDATE ${table} SET level = ? WHERE id = ?`
// 删除user
export const deleteUser = `DELETE FROM ${table} WHERE id = ?`

// user鉴权
export const authUser = `SELECT * FROM ${table} WHERE username = ?`

// 查找用户
export const findUser = `SELECT * FROM ${table} WHERE email = ?`

// 获取具体用户的id
export const getUserId = `SELECT id FROM ${table} WHERE username = ?`

// 获取用户名和密码 需要接收的参数为[username, password]
export const getUser = `SELECT * FROM ${table} WHERE username = ? AND password = ?`
