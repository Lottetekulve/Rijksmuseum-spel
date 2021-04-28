const socket = io();
const form = document.querySelector('#form1')
const nextButton = document.querySelector('#form2')
const username = form.querySelector('input#name')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')
const rightAnswer = document.querySelector('#rightAnswer')
const disconnected = document.querySelector('#disconnected')
const picture = document.querySelector('img')
const text = document.querySelector('h2')
const artists = document.querySelector('h3')


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

function clearElement(element) {
  element.innerHTML = ''
}



nextButton.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('event')
})

// leave.addEventListener('submit', (e) => {
//   e.preventDefault()
//   socket.emit('disconnect')
// })





socket.on('chat', data => {
  const el = document.createElement('li')
  const name = document.createElement('h4')
  const guess = document.createElement('p')
  name.innerText = data.name
  guess.innerText = data.message
  name.classList.add('chat-name')
  guess.classList.add('chat-message')
  el.classList.add(data.name === username.value ? 'own-message' : 'message')
  el.appendChild(name)
  el.appendChild(guess)
  messages.appendChild(el)
  messages.scrollTop = messages.scrollHeight

  async function checkAnswer() {
    const currentArt = artists.textContent
    const answer = guess.textContent
    console.log(answer)
    console.log(currentArt)

    if (answer.toLowerCase() === currentArt.toLowerCase()) {
        return response()

          async function response(){
            return rightAnswer.textContent = "Someone guessed the right answer!";
          }

    } else {
        console.log('false')
    }
  }

  checkAnswer()
})


socket.on('event', (textandimage) => {
  clearElement(rightAnswer)
  artists.innerText = textandimage.artist;
  text.innerText = textandimage.text;
  picture.src = textandimage.image;
})

socket.on('disconnect', () => {
  return disconnected.textContent = "Someone left the game!";
})


