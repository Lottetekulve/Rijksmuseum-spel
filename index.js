const
  express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  router = require('express').Router(),
  getArtObjects = require('./utils/filterData'),
  routes = require('./router/router'),
  port = process.env.PORT || 5001
  
  // require('dotenv').config();
app
  .use(express.static(path.join(__dirname, "static/public")))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)
  .set('view engine', 'ejs')
  .set('views', 'views')

server.listen(port, () => {
  console.log('listening on port', port)
});


// var i = require('./static/public/js/socket')

io.on('connection', async socket => {
  var i = 0
  socket.on('event', async data => {
    const dataArt = await getArtObjects()
    i = i + 1
      const textandimage = {
        artist: dataArt[0 + i].principalOrFirstMaker,
        text: dataArt[0 + i].title,
        image: dataArt[0 + i].webImage.url,
      } 
    // console.log(i)
  io.emit('event', textandimage)
  })

  socket.on('chat', data => {
    io.emit('chat', data)
  })
})


app.use(router)

// async function checkAnswer (name, message) {
//   //get the data from the current album from localstorage
//   const currentArt = artist

//   //transform both values to lower case to prevent capital
//   // letters from making an answer wrong
//   if (message.toLowerCase() === currentArt.name.toLowerCase()) {
//       addScore(name)
//       await getArtObjects()
//       return true
//   } else {
//       return false
//   }
// }

// checkAnswer()


// socket.on('join', data => {
  //   roomData.users.push(data.username)
  //   io.emit('roomData', roomData)
  // })

  // artObjects[roomData.round]