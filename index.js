'use strict'

var app = require('express')()
var bodyParser = require('body-parser')
var server = require('http').Server(app)

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/tito/:key', function(req, res){
  var whname = req.headers['x-webhook-name']
  if(req.params.key  && req.params.key === process.env.TITO_ACCESS_KEY && whname){
    var created = whname === 'ticket.created'
    if(created || whname === 'ticket.updated'){
      console.log(req.body)
      res.send('ok')
    }
    else res.send('error')
  }
  else res.send('error')
})

server.listen(process.env.PORT, function() {
  console.log('listening on port %d', process.env.PORT)
})