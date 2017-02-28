var application_root = __dirname,
  express = require('express'),
	path 	= require("path");

var logger = require('express-logger');
app = express();
	
var	server = require('http').createServer(app),
	io = require('socket.io').listen(server);


app.use(logger({path: '/tmp/dev.txt'}));
app.use(express.bodyParser());
app.use(express.static(path.join(application_root, "public")));


///DATA
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.sockets.on('connection', function (socket) {
	
	setInterval(function(){
		var data = getRandomInt(0,100);
		io.sockets.emit('pushdata', data);
	},2000);
	
});

server.listen(8070);
console.log('Server is listening on port 8070...');