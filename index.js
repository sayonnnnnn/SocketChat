const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = 3000 || process.env.PORT

// To run when a client connects to the server 
io.on('connection', socket =>{
  console.log("Socket is ready for active connection")

  // Listens for chatMessage and logs the message in the 'SERVER'
  socket.on('chatMessage', (msg)=>{

    const user = getCurrentUser(socket.id)

    // console.log(message)
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  // This message is shown when a user disconnects from the websocket
  socket.on('disconnect', ()=>{
    const user = userLeaves(socket.id)
    if(user){
      // The below statement would show to all the users the message
      // use socket.broadcast.emit('message', 'something...') to hide the message 
      // from the user who disconnects but shows to all other users instead!
      io.to(user.room).emit('message', formatMessage('SocketChat', `${user.username} has disconnected from the chat!`))
      
      // SEND USERS AND ROOM INFORMATION
      io.to(user.room).emit('roomUsers', {
        room: user.room, 
        users: getRoomUsers(user.room)
      })
    }
  })

  socket.on('joinRoom', ({username, room})=>{

    const user = userJoin(socket.id, username, room)
    socket.join(user.room) 


    // This message is shown to you when you are connected to the websocket
    socket.emit('message', formatMessage('SocketChat','Welcome to SocketChat')) 

    // This message is shown to other users when you are connected to the websocket
    socket.broadcast.to(user.room).emit('message', formatMessage('SocketChat',`${user.username} has joined the chat`))

    // This message is shown to all the users no matter what
    // io.emit()

    // SEND USERS AND ROOM INFORMATION
    io.to(user.room).emit('roomUsers', {
      room: user.room, 
      users: getRoomUsers(user.room)
    })
  })

})

app.use(express.static(path.join(__dirname, 'public')))

// app.listen(PORT, ()=>console.log(`Server is listening to port ${PORT}`))
server.listen(PORT, ()=>console.log(`Server is listening to port ${PORT}`))
