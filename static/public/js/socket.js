const socket = io();
const form = document.querySelector('form')
const username = form.querySelector('input#name')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')

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


socket.on('chat', data => {
  const img = document.createElement('img')
  const el = document.createElement('li')
  const name = document.createElement('p')
  const message = document.createElement('p')
  img
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