var NRP    = require('node-redis-pubsub');

var config = {
  port: 6379                        , // Port of your remote Redis server
  host: '139.59.18.91' , // Redis server host, defaults to 127.0.0.1
  scope: 'demo'                       // Use a scope to prevent two NRPs from sharing messages
};
var nrp = new NRP(config); // This is the NRP client

///DATA
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(function(){
	var data = getRandomInt(0,100);
	nrp.emit('stockdata', { ticket: 'cnd:ind', value: data });   // Outputs 'Hello Louis'

},2000);


