const
  express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  router = require('express').Router(),
  // getArtObjects = require('./utils/filterData'),
  routes = require('./router/router'),
  port = process.env.PORT || 4000 ,
  // LocalStorage = require('node-localstorage').LocalStorage
  getData = require('./utils/getData')
  

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




const artists = ['Johannes Vermeer', 'Rembrandt van Rijn', 'Vincent van Gogh', 'Karel Appel', 'Jeroen Bosch', 'Pieter Brueghel', 'Mondriaan']

const filterData = async () => {
    const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&p=1&ps=100'
    const data = await getData(endpoint)
    const filteredData = data.artObjects.filter(artObject => {
    return artists.includes(artObject.principalOrFirstMaker)
  })
  return filteredData
}

filterData()

let dataArt
const getArtObjects = async () => {
  const data = await filterData()
  const data2 = data.sort(() => .5 - Math.random())

  dataArt = data2
  return dataArt
}

getArtObjects()
  .then( () => console.log('laden'))

let i = 0;


io.on('connection', async socket => {

  socket.on('event', () => {
    if( i >= dataArt.length - 1) {
      i = 0
    }
    else {
      i = i + 1
    }

    const textandimage = {
      artist: dataArt[i].principalOrFirstMaker,
      text: dataArt[i].title,
      image: dataArt[i].webImage.url
    } 
  
    console.log(i)
  io.emit('event', textandimage)
  })

  socket.on('chat', data => { 
    io.emit('chat', data)
  })

  socket.on('disconnect', data => {
    io.emit('disconnected', data)
  })
})


app.use(router)