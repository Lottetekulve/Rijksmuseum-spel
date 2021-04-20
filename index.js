const
  express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  router = require('express').Router()

  const getArtObjects = require('./utils/filterData');
  const routes = require('./router/router');
  
app
  .use(express.static(path.join(__dirname, "static/public")))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)
  .set('view engine', 'ejs')
  .set('views', 'views')

server.listen(4000, () => {
  console.log('running on port 4000')
});


// let roomData = {
//   round: 0,
//   users: [
//     {
//       username: 'dasdsa',
//       points: 421231,
//     }
//   ]
// }



io.on('connection', async socket => {

  const dataArt = await getArtObjects()
  // console.log(dataArt)
  const textandimage = {
    text: dataArt[0].title,
    image: dataArt[0].webImage.url
    }

  io.emit('image', textandimage)
  
  socket.on('chat', data => {
    io.emit('chat', data)
  })
})

app.use(router)




// socket.on('join', data => {
  //   roomData.users.push(data.username)
  //   io.emit('roomData', roomData)
  // })

  // artObjects[roomData.round]