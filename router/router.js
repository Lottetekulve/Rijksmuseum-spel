const router = require('express').Router()

router.get('/', async function (req, res) {

  res.render('main'); 
  
})

module.exports = router
