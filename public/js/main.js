const chatForm = document.getElementById('chat-form')
const socket = io()

// Message from the SERVER
socket.on('message', (message)=>{
  // console.log(message)
  outputMessage(message)
})

// Message on submit button
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
})

// outputMessage() which displays the message in the DOM
function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `
  <p class="meta">Brad<span>9:12pm</span></p>
		<p class="text">
      ${message}
		</p>`; 
  document.querySelector('.chat-messages').appendChild(div)
}
