const socket = io();
const form = document.querySelector('form')
const username = form.querySelector('input#name')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')
const picture = document.querySelector('img')
const text = document.querySelector('h2')

// usernameForm.addEventListener('submit', (e) => {
//   const name = document.querySelector('input#username')
//   socket.emit('join', { username: name })
// })

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (message.value) {
    socket.emit('chat', {
      name: username.value,
      message: message.value
    })
    username.style.display = 'none'
    message.value = ''
  }
})

// socket.on('roomData', data => {
//   console.log(data.users)
//   data.users.forEach(user => {
//   })
// })

socket.on('chat', data => {
  const el = document.createElement('li')
  const name = document.createElement('p')
  const message = document.createElement('p')
  name.innerText = data.name
  message.innerText = data.message
  name.classList.add('chat-name')
  message.classList.add('chat-message')
  el.classList.add(data.name === username.value ? 'own-message' : 'message')
  el.appendChild(name)
  el.appendChild(message)
  messages.appendChild(el)
  messages.scrollTop = messages.scrollHeight
})

socket.on('image', (textandimage) => {
  // console.log(title)
  text.innerText = textandimage.text;
  picture.src = textandimage.image;
})