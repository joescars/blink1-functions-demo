'use strict';
require('dotenv').config();

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var exec = require('nexecp').exec;

// Get messages from Azure IoT Hub
var iotHost = process.env.IOT_HOST;
var deviceKey = process.env.DEVICE_KEY;
var deviceId = process.env.DEVICE_ID;

var connectionString = 'HostName=' + iotHost +';DeviceId=' + deviceId + ';SharedAccessKey=' + deviceKey;
var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');
    client.on('message', function (msg) {
        console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
        client.complete(msg, printResultFor('completed'));
        
        // Call the Blink Tool
        blink("blue");      

    });    
  }
};

client.open(connectCallback);

// Let's Blink
function blink(color) {

    exec('blink1-tool --rgb ' + getrgb(color) + ' --glimmer=3').then(function(out) {
        console.log(out.stdout, out.stderr);
    }, function(err) {
        console.error(err);
    });

}

function getrgb(color) {
  switch(color) {
    case 'red':
      return 'ff0000';
      break;
    case 'green':
      return '008000';
      break;
    case 'blue':
      return '0000ff';
      break;  
    case 'yellow':
      return 'ffff00';
      break;                  
    case 'pink':
      return 'ffc0cb';
      break; 
    default:
      return 'ffffff';
  }
}

