var log4js = require('log4js');

/*
 Sample logstash config:
   udp {
    codec => json
    port => 10001
    queue_size => 2
    workers => 2
    type => myAppType
  }
*/

log4js.configure({
  "appenders": [
    {
      type: "console",
      category: "myLogger"
    },
    {
      "host": "139.59.7.236",
      "port": 10001,
      "type": "logstashUDP",
      "logType": "myAppType", // Optional, defaults to 'category'
      "fields": {             // Optional, will be added to the 'fields' object in logstash
        "field1": "value1",
        "field2": "value2"
      },
      "layout": {
        "type": "pattern",
        "pattern": "%m"
      },
      "category": "myLogger"
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
logger.info("Test log message %s", "arg1", "arg2");
logger.info("Test log message %s", "arg1", "arg2");
logger.info("Test log message %s", "arg1", "arg2");
logger.info("Test log message %s", "arg1", "arg2");
logger.info("Test log message %s", "arg1", "arg2");
logger.info("Test log message %s", "arg1", "arg2");
logger.info("Test log message %s", "arg1", "arg2");
