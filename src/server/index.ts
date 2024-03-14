import http from 'node:http'
import express from 'express'
import { Server as SocketIOServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // 允许所有来源
    methods: ['GET', 'POST'],
  },
})

// 启动websocket服务在端口3000 设置用户名
// const wss = new WebSocket.Server({ port: 3000 })
// const users = new Set()
// wss.on('connection', (ws) => {
//   console.log('A user connected')

io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
  // 接受客户端发送的消息
  socket.on('message', (data) => {
    console.log('message:', data)
    // 广播给所有客户端
  })
})

// Start the server
const port = 3000
io.listen(port)
