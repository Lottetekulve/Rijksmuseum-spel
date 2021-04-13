const
  express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  router = require('./router')
  
app
  .use(express.static(path.join(__dirname, "static/public")))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('view engine', 'ejs')
  .set('views', 'views')

server.listen(4000)

io.on('connection', socket => {
  socket.on('chat', data => {
    io.emit('chat', data)
  })
})

app.use(router)



// const express = require("express")
// const path = require('path');
// require('dotenv').config();
// const app = express()


// const PORT = process.env.PORT || 3002;
// const getData = require('./modules/api.js')


// // Tell express to use a 'static/public' folder
// // If the url matches a file it will send that file
// app.use(express.static(path.join(__dirname, "static/public")));
// app.set('view engine', 'ejs');
// app.set('views', 'views');



// app.get('/', async function renderOverview(req, res){
//     const url = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&ps=200'
//     const data = await getData(url)
//     const artList = data.artObjects
//     // console.log(artList)
  
//     res.render('index.ejs',{
//       artList: artList
//     })
// })


// // listen for requests
// app.listen(PORT, () => {
//     console.log(`App is launched on http://localhost:${PORT}`)
//   });


