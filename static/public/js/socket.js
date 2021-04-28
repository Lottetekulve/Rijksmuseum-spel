const socket = io();
const form = document.querySelector('#form1')
const form2 = document.querySelector('#form2')
const nextButton = document.querySelector('#form2') 
const startButton = document.querySelector('#form3') 
const username = form.querySelector('input#name')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')
const rightAnswer = document.querySelector('#rightAnswer')
const nextAnswer = document.querySelector('#nextAnswer')
const userLeft = document.querySelector('#disconnected')
const picture = document.querySelector('img')
const text = document.querySelector('h2')
const artists = document.querySelector('h3')
const bName = document.querySelector('#bname')
const bScore = document.querySelector('#bscore')

function clearElement(element) {
  element.innerHTML = ''
}

form.addEventListener('submit', (e) => {
  clearElement(userLeft)
  clearElement(rightAnswer)
  clearElement(nextAnswer)
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
let points = 0

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
    // console.log(answer)
    // console.log(currentArt)

    if (answer.toLowerCase() === currentArt.toLowerCase()) {
      points = points + 1
      return next() 
    } 
    else {
      return false
    }
  }

  checkAnswer()


  const newLeaderBoard = {
    name: data.name,
    points: points
  }

localStorage.setItem('leaderBoard', JSON.stringify(newLeaderBoard))
const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'))

boardName = leaderBoard.name
boardScore = leaderBoard.points

bName.textContent = boardName
bScore.textContent = boardScore

})





startButton.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('event')
  startButton.style.display = 'none'
  const nextText = document.createElement('p')
  const nextButton = document.createElement('button')
  nextText.textContent = 'Voor als niemand het antwoord weet:'
  nextButton.textContent = 'VOLGENDE'
  form2.appendChild(nextText)
  form2.appendChild(nextButton)
})

nextButton.addEventListener('submit', (e) => {
  const currentArtist = artists.textContent
  nextAnswer.textContent = 'Het juiste antwoord was ' + currentArtist
  messages.appendChild(nextAnswer)
  clearElement(rightAnswer)
  e.preventDefault()
  socket.emit('event')
})

function next(){
  rightAnswer.textContent = "Someone guessed the right answer!"
  socket.emit('event')
}

socket.on('event', (textandimage) => {
  clearElement(userLeft)
  artists.innerText = textandimage.artist;
  text.innerText = textandimage.text;
  picture.src = textandimage.image;
})



socket.on('disconnected', () => {
  return userLeft.textContent = "Someone left the game!";
})






// function addScore (name) {

//   const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'))

//   const user = leaderBoard.find((user) => user.name === name)

//   //place all other users in a new array
//   const otherUsers = leaderBoard.filter((user) => user.name !== name)

//   // const newLeaderBoard = [...otherUsers, {
//   //     name: name,
//   //     score: user ? user.score + 1 : 1
//   // }]
//   // const sortedLeaderBoard = newLeaderBoard.sort((a, b) => b.score - a.score)

//   // return localStorage.setItem('leaderBoard', JSON.stringify(newLeaderBoard))
// }