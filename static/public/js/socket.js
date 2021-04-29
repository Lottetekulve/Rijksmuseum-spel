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


//clear element voor goed en verlaat messages
function clearElement(element) {
  element.innerHTML = ''
}


//event lisnter voor chat knop
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

// let points voor punten van de gebruikers
let points = 0


// chat maken
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


  //checkt of het antwoord goed is
  async function checkAnswer() {
    const currentArt = artists.textContent
    const answer = guess.textContent

    // als answer gelijk is aan current art dan functie next + 1 point
    if (answer.toLowerCase() === currentArt.toLowerCase()) {
      points = points + 1
      return next() 
    } 
    else {
      return false
    }
  }

  checkAnswer()

  // maak local storage variabele aan
  const newLeaderBoard = {
    name: data.name,
    points: points
  }

  // set in local storage en haal weer op
  localStorage.setItem('leaderBoard', JSON.stringify(newLeaderBoard))
  const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'))

  boardName = leaderBoard.name
  boardScore = leaderBoard.points

  // set waardes in html
  bName.textContent = boardName
  bScore.textContent = boardScore
})


// voor de startbutton in het begin van het spel en maakt volgende button aan ipv start button
startButton.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('showData')
  startButton.style.display = 'none'
  const nextText = document.createElement('p')
  const nextButton = document.createElement('button')
  nextText.textContent = 'Voor als niemand het antwoord weet:'
  nextButton.textContent = 'VOLGENDE'
  form2.appendChild(nextText)
  form2.appendChild(nextButton)
})

// volgende button met next van image functie
nextButton.addEventListener('submit', (e) => {
  const currentArtist = artists.textContent
  nextAnswer.textContent = 'Het juiste antwoord was ' + currentArtist
  messages.appendChild(nextAnswer)
  clearElement(rightAnswer)
  e.preventDefault()
  socket.emit('showData')
})

// wanneer goede antwoord geraden is, en nieuwe image uitvoeren
function next(){
  rightAnswer.textContent = "Het goede antwoord is geraden!"
  socket.emit('showData')
}

// zet image en text in de html
socket.on('showData', (textandimage) => {
  clearElement(userLeft)
  artists.innerText = textandimage.artist;
  text.innerText = textandimage.text;
  picture.src = textandimage.image;
})


// wanneer een gebruiker disconnects of de pagina sluit.
socket.on('disconnected', () => {
  return userLeft.textContent = "Een speler heeft het spel verlaten";
})


