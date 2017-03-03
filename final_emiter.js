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

logger.info("Starting Emitter")

var NRP    = require('node-redis-pubsub');
redis_host = process.env.REDIS_HOST || "127.0.0.1";

var config = {
  port: 6379                        , // Port of your remote Redis server
  host: redis_host, // Redis server host, defaults to 127.0.0.1
  scope: 'demo'                       // Use a scope to prevent two NRPs from sharing messages
};
var nrp = new NRP(config); // This is the NRP client

///DATA
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(function(){
	var data = getRandomInt(0,100);
	logger.info("Stock cnd:ind is now at " + data )
	nrp.emit('stockdata', { ticket: 'cnd:ind', value: data });   // Outputs 'Hello Louis'

},2000);


