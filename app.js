var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/public/index.html');

/*
// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});
*/

var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));


var server = require('http').Server(app);



// Socket.io server listens to our app
var io = require('socket.io')(server);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

/*
// Emit welcome message on connection
io.on('connection', function(socket) {
	setInterval(function(){
		var data = getRandomInt(0,100);
		io.sockets.emit('pushdata', data);
	},2000);
	

	socket.on('i am client', console.log);
});
*/
var NRP    = require('node-redis-pubsub');
var config = {
  port  : 6379  , // Port of your locally running Redis server
  scope : 'demo'  // Use a scope to prevent two NRPs from sharing messages
};

var nrp = new NRP(config); // This is the NRP client


nrp.on('stockdata', function(data){
  console.log('ticker ' + data.ticket + " " + data.value);
  io.sockets.emit('ticker', data);
});

/*
// You can use patterns to capture all messages of a certain type
// The matched channel is given as a second parameter to the callback
nrp.on('city:*', (data, channel) => {
  console.log(data.city + ' is great');
});
*/

server.listen(port);
