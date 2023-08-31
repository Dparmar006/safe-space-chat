const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const { CHAT_EVENTS } = require('./utils/constants')
const chatHandler = require('./chat')
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: process.env.FE_BASE_URL
  }
})
require('dotenv').config()
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello there')
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Serve your static files or set up routes as needed.
app.use(express.static(__dirname + '/public'))

io.on(CHAT_EVENTS.CONNECTION, chatHandler)
