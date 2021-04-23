const router = require('express').Router()
// const filterData = require('../utils/filterData')
// const getData = require('../utils/getData')

router.get('/', async function (req, res) {

  res.render('main'); 
})

module.exports = router
