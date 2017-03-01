var http = require('http')
var express = require('express')
app = express()
port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

var server = require('http').Server(app);

// Socket.io server listens to our app
var io = require('socket.io')(server);

var NRP    = require('node-redis-pubsub');

var config = {
  port: 6379                        , // Port of your remote Redis server
  host: '139.59.18.91' , // Redis server host, defaults to 127.0.0.1
  scope: 'demo'                       // Use a scope to prevent two NRPs from sharing messages
};

var nrp = new NRP(config); // This is the NRP client


nrp.on('stockdata', function(data){
  console.log('ticker ' + data.ticket + " " + data.value);
  io.sockets.emit('ticker', data);
});

server.listen(port);
