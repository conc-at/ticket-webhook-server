'use strict'

var app = require('express')()
var server = require('http').Server(app)

server.listen(process.env.PORT, function() {
  console.log('listening on port %d', process.env.PORT)
})