var http = require('http')//,
//    fs = require('fs'),
//    index = fs.readFileSync(__dirname + '/public/index.html');

var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

var server = require('http').Server(app);

var io = require('socket.io')(server);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.sockets.on('connection', function (socket) {
  
  setInterval(function(){
    var data = getRandomInt(0,100);
    io.sockets.emit('ticker', {ticker: "dummy", value: data});
  },2000);
  
});

server.listen(3000);
