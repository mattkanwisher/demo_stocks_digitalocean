var log4js = require('log4js');

log4js.configure({
  "appenders": [
    {
      type: "console",
      category: "myLogger"
    },
    {
      "type": "log4js-syslog-appender",
      "tag": "YOUR LOG TAG",
      "facility": "local0",
      "hostname": "localhost",
      "port": 514,
      "transport": "UDP"
    }
  ]
});

var logger = log4js.getLogger("myLogger");

logger.info("Starting")

var http = require('http')
var express = require('express')
app = express()
port = process.env.PORT || 3000;
redis_host = process.env.REDIS_HOST || "127.0.0.1";
app.use(express.static(__dirname + '/public'));
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

var server = require('http').Server(app);

// Socket.io server listens to our app
var io = require('socket.io')(server);

var NRP    = require('node-redis-pubsub');

var config = {
  port: 6379,
  host: redis_host, 
  scope: 'demo'                       
};

var nrp = new NRP(config); // This is the NRP client


nrp.on('stockdata', function(data){
  console.log('ticker ' + data.ticket + " " + data.value);
  io.sockets.emit('ticker', data);
});

logger.info("Application finished initialization. Binding");

server.listen(port);
