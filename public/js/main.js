const chatForm = document.getElementById('chat-form')
const socket = io()
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// GET USERNAME AND ROOM FROM THE URL 
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// console.log(`${username} is the username and he/she is in ${room} room.`)

// GET ROOM AND USERS
socket.on('roomUsers', ({room, users})=>{
  outputRoomName(room)
  outputRoomUsers(users)
})

// JOIN CHATROOM 
socket.emit('joinRoom', {username, room}) // We need to catch this emit() in the server side 

// MESSAGE FROM THE SERVER -----------------------------
socket.on('message', (message)=>{
  console.log(message)
  outputMessage(message)

  // scroll down automatically
  chatMessages.scrollTop = chatMessages.scrollHeight 
})

// MESSAGE AFTER CLICKING THE SUBMIT BUTTON ----------------------------------
chatForm.addEventListener('submit', (event)=>{
  // By default, addEventListener submits the results of the form into a file. 
  // So, in order to prevent(stop) that from happening, we discontinued the
  // the default behavior of the addEventListener 
  event.preventDefault()
  
  const msg = event.target.elements.msg.value
  // Logs the msg into the console 'CLIENT'
  // console.log(msg)

  // Emitting a message to the 'SERVER'
  socket.emit('chatMessage', msg)

  // Clearing the input form after a message has been sent successfully
  event.target.elements.msg.value = ''
  event.target.elements.msg.focus() 
})

// outputMessage() WHICH DISPLAYS THE MESSAGE IN THE DOM ------------- 
function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `
  <p class="meta">${message.username} <span>${message.time}</span></p>
		<p class="text">
      ${message.text}
		</p>`; 
  document.querySelector('.chat-messages').appendChild(div)
}

// outputRoomName() which DISPLAYS ROOM NAME IN THE DOM
function outputRoomName(room){
  roomName.innerText = room
}

// outputRoomUsers() which SHOWS THE USERS IN THE ROOM 
function outputRoomUsers(users){

  // Here, using map() we are turning an array of userList into a string and outputting it into the DOM 
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}