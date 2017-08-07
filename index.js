var exec = require('nexecp').exec;

// TODO: Connect Azure IoT Hub

// Call the Blink Tool
blink("1,6,8,1");

// Let's Blink
function blink(pattern) {

    exec('blink1-tool --play ' + pattern).then(function(out) {
    console.log(out.stdout, out.stderr);
    }, function(err) {
    console.error(err);
    });

}

/*

https://github.com/todbot/blink1/releases

https://github.com/todbot/blink1/blob/master/docs/blink1-mk2-tricks.md

*/
