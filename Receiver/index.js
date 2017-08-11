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

// Call the command differently if windows vs mac/linux
var isWin = /^win/.test(process.platform);
var blinkCmd = "blink1-tool";
if (!isWin) {
  blinkCmd = "./blink1-tool";
}

// Blinks Twice on load
blinkLoaded()

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');
    client.on('message', function (msg) {
        var msgText = uint8arrayToString(msg.data);
        console.log('Body: ' + msgText);
        client.complete(msg, printResultFor('completed'));
        
        // Call the Blink Tool
        blink(getEventColor(msgText));

    });    
  }
};

// Open IoT Hub Connection
client.open(connectCallback);

// Let's Blink
function blink(color) {
    exec(blinkCmd + ' --rgb ' + getrgb(color) + ' --glimmer=3').then(function(out) {
        console.log(out.stdout);
    }, function(err) {      
        // uncomment to see full error
        // console.error(err);
        console.error("Blink is currently in use");
    });
}

// blinks orange twice on load
function blinkLoaded() {
    exec(blinkCmd + ' --rgb ff9900 --blink 2').then(function(out) {
        console.log(out.stdout, out.stderr);
    }, function(err) {
        console.error(err);
    });  
}

function getEventColor(msg) {
  switch(msg){
    case 'twitter': return 'green';      
    case 'github': return 'red';      
    default: return 'blue';      
  }
}

function getrgb(color) {
  switch(color) {
    case 'red': return 'ff0000';
    case 'green': return '008000';
    case 'blue': return '0000ff';
    case 'yellow': return 'ffff00';
    case 'pink': return 'ffc0cb';
    default: return 'ffffff';
  }
}

function uint8arrayToString(myUint8Arr){
   return String.fromCharCode.apply(null, myUint8Arr);
}

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}