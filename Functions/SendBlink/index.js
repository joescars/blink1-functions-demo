var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = process.env.IoTHubConnection;
var targetDevice = 'blinksim';

module.exports = function (context, req) {

    context.log('Send Blink Trigger Started');

    if (typeof req.body != 'undefined' && typeof req.body == 'object') {

        var myReq = req.body;

        var client = Client.fromConnectionString(connectionString);
        client.open(function (err) {
        if (err) {
            context.log('Could not connect: ' + err.message);
        } else {
            context.log('Client connected');
        
            // Create a message and send it to the device
            var data = myReq.msg;
            var message = new Message(data);
            context.log('Sending message: ' + message.getData() + ' to: ' + targetDevice);
            client.send(targetDevice, message, printResultFor('send', context));
        }
        context.done();
        });

    }    

};

function printResultFor(op, context) {
    return function printResult(err, res) {
        if (err) context.log(op + ' error: ' + err.toString());
        if (res) context.log(op + ' status: ' + res.constructor.name);
    };
}