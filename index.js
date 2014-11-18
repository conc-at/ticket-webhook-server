'use strict'

var app = require('express')()
var bodyParser = require('body-parser')
var server = require('http').Server(app)

var slack = require('slack-notify')(process.env.SLACK_WEBHOOK_URL);

slack.onError = function(err){
  console.log('slack error:', err)
}

var ticketSlack = slack.extend({
  channel: process.env.SLACK_CHANNEL || '#general',
  icon_emoji: ':ticket:',
  username: 'Ticket'
})

app.disable('x-powered-by')
app.use(bodyParser.json())

app.post('/tito/:key', function(req, res){
  console.log('new tito request')
  var whname = req.headers['x-webhook-name']
  if(req.params.key  && req.params.key === process.env.TITO_ACCESS_KEY && whname){
    var created = whname === 'ticket.created'
    if(created || whname === 'ticket.updated'){
      var msg = '"' + req.body.name + '" '
      if(created) msg += 'bought a new ticket.'
      else msg += 'updated a ticket.'
      ticketSlack(msg + ' (' + req.body.release + ')')
      res.send('ok')
    }
    else res.send('error')
  }
  else res.send('error')
})

server.listen(process.env.PORT, function() {
  console.log('listening on port %d', process.env.PORT)
})
