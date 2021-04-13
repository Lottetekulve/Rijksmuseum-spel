const router = require('express').Router()
const getData = require('./modules/api.js')

router.get('/', async function renderOverview(req, res){
    const url = 'https://www.rijksmuseum.nl/api/nl/collection/?key=7TAeATmh&ps=200'
    const data = await getData(url)
    const artList = data.artObjects

    res.render('main.ejs', {artList: artList})
})

module.exports = router
