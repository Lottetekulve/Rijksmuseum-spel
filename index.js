const
  express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  router = require('express').Router(),
  routes = require('./router/router'),
  port = process.env.PORT || 4000 ,
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



// gekozen kunstenaars voor filter
const artists = ['Johannes Vermeer', 'Rembrandt van Rijn', 'Vincent van Gogh', 'Karel Appel', 'Jeroen Bosch', 'Pieter Brueghel', 'Mondriaan']


// filter functie
const filterData = async () => {
    const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&p=1&ps=100'
    const data = await getData(endpoint)
    const filteredData = data.artObjects.filter(artObject => {
    return artists.includes(artObject.principalOrFirstMaker)
  })
  return filteredData
}

filterData()

// random sort functie
let dataArt
const getArtObjects = async () => {
  const data = await filterData()
  const data2 = data.sort(() => .5 - Math.random())

  dataArt = data2
  return dataArt
}


getArtObjects()
  .then( () => console.log('laden'))

// waarde van i instellen voor doorloopen van de artobjects
let i = 0;

// on connection
io.on('connection', async socket => {

  // maakt data aan dat naar client wordt gestuurd 
  socket.on('showData', () => {
    if( i >= dataArt.length - 1) {
      i = 0
    }
    else {
      i = i + 1
    }

    // data voor op de client
    const textandimage = {
      artist: dataArt[i].principalOrFirstMaker,
      text: dataArt[i].title,
      image: dataArt[i].webImage.url
    } 
  
    console.log(i)
  io.emit('showData', textandimage)
  })

  // chat
  socket.on('chat', data => { 
    io.emit('chat', data)
  })

  // disconnect
  socket.on('disconnect', data => {
    io.emit('disconnected', data)
  })
})


app.use(router)