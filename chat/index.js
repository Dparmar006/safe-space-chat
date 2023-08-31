const { CHAT_EVENTS } = require('../utils/constants')

const users = {}

const chatHandler = socket => {
  console.log('\nNEW USER CONNECTED : ', socket.id)
  socket.on(CHAT_EVENTS.USER_REQUESTED_TO_JOIN, user => {
    const { username } = user
    console.log('\nUSER JOINED : ', username)
    users[username] = socket.id
    socket.broadcast.emit(CHAT_EVENTS.USER_JOINED, user)
  })
  socket.on(CHAT_EVENTS.MESSAGE_SENT_REQUEST, (payload, to) => {
    const { message } = payload
    console.log('\nMESSAGE : ', message)
    socket.to(users[to]).emit(CHAT_EVENTS.MESSAGE_RECEIVED, {
      message,
      from: {
        socketId: users[to],
        username: to
      }
    })
  })

  // Handle user disconnections.
  socket.on(CHAT_EVENTS.DISCONNECT, () => {
    const username = 'someone'
    // TODO: Rmove user from the 'users' object
    // delete users[users[to]]
    console.log('\nUSER LEFT : ', username)
    socket.broadcast.emit(CHAT_EVENTS.USER_DISCONNECTED, username)
  })
}

module.exports = chatHandler
