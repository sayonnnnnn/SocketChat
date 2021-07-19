const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = 3000 || process.env.PORT

// To run when a client connects
io.on('connection', socket =>{
  console.log("Socket is ready for active connection")
  
  // This message is shown to you when you are connected to the websocket
  socket.emit('message','Welcome to SocketChat')

  // This message is shown to other users when you are connected to the websocket
  socket.broadcast.emit('message', 'Sayon has joined the chat')

  // This message is shown to all the users no matter what
  // io.emit()

  // This message is shown when a user disconnects from the websocket
  socket.on('disconnect', ()=>{
    // The below statement would show to all the users the message
    // use socket.broadcast.emit('message', 'something...') to hide the message 
    // from the user who disconnects but shows to all other users instead!
    io.emit('message', 'A user has disconnected from the chat!')
  })

})

app.use(express.static(path.join(__dirname, 'public')))

// app.listen(PORT, ()=>console.log(`Server is listening to port ${PORT}`))
server.listen(PORT, ()=>console.log(`Server is listening to port ${PORT}`))
