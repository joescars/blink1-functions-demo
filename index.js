'use strict';
require('dotenv').config();

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var exec = require('nexecp').exec;

// Get messages from Azure IoT Hub
// https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-c2d

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
        blink("1,6,8,1");      
    });    
  }
};

client.open(connectCallback);

// Let's Blink
function blink(pattern) {

    exec('blink1-tool --play ' + pattern).then(function(out) {
        console.log(out.stdout, out.stderr);
    }, function(err) {
        console.error(err);
    });

}

/*
    Blink(1) Documentation and Tooling
    https://github.com/todbot/blink1/releases
    https://github.com/todbot/blink1/blob/master/docs/blink1-mk2-tricks.md
*/
