const express = require('express'),
  router = express.Router()

module.exports = router

router.get('/', (request, response) => {
  response.sendfile('views/index.html')
})
