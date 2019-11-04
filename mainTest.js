/*
 /$$$$$$$ /$$       /$$$$$$$                    /$$                         /$$   /$$           /$$    
| $$__  $|__/      | $$__  $$                  |__/                        | $$$ | $$          | $$    
| $$  \ $$/$$      | $$  \ $$ /$$$$$$ /$$    /$$/$$ /$$$$$$$ /$$$$$$       | $$$$| $$ /$$$$$$ /$$$$$$  
| $$$$$$$| $$      | $$  | $$/$$__  $|  $$  /$$| $$/$$_____//$$__  $$      | $$ $$ $$/$$__  $|_  $$_/  
| $$____/| $$      | $$  | $| $$$$$$$$\  $$/$$/| $| $$     | $$$$$$$$      | $$  $$$| $$$$$$$$ | $$    
| $$     | $$      | $$  | $| $$_____/ \  $$$/ | $| $$     | $$_____/      | $$\  $$| $$_____/ | $$ /$$
| $$     | $$      | $$$$$$$|  $$$$$$$  \  $/  | $|  $$$$$$|  $$$$$$$      | $$ \  $|  $$$$$$$ |  $$$$/
|__/     |__/      |_______/ \_______/   \_/   |__/\_______/\_______/      |__/  \__/\_______/  \___/ 


Description: My personal tool to control my LEDs and stuff. This program will have the end goal of communicating
with other rPis around my room and managing the flow of commands between them to control devices. For now, this program
is being used to directly test control of devices, and will later be adapted to pass on this control to other rPis.

Author: Logan (YoloSwagDogDiggity)
Version: 1.0.0 (InDev)
Date: 10/12/2019
*/


//##################################################################
//                    Setup and Declarations
//##################################################################

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')
var schedule = require('node-schedule');

// Connect to public MQTT broker and publish status to other clients.
client.on('connect', function () {
    client.publish('459123459', 'Main server has started!');
    console.log("Host is running and ready to dispatch commands! :)");
    // Listen to responses from clients
    client.subscribe('459123459', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Still need to add node-schedule to npm package file ahhhh
// Turn both door lights on at 7:30am every morning
schedule.scheduleJob('30 7 * * 1-5', sendCommand("RL1ON"));  
schedule.scheduleJob('30 7 * * 1-5', sendCommand("RL2ON"));
// Turn both door lights off at 2:30am every morning (I'm a night owlß)
schedule.scheduleJob('30 7 * * 1-5', sendCommand("RL1OFF"));  
schedule.scheduleJob('30 7 * * 1-5', sendCommand("RL2OFF"));


// Read all messages that go through MQTT channel
client.on('message', function (topic, message) {
    // Log all MQTT messages that go through channel
    console.log("MQTT: " + message.toString());

    switch(message) {
        case "RL1STAT_ON":
            console.log("RL1 is currently ON");
          break;
        case "RL1STAT_OFF":
            console.log("RL1 is currently OFF");
          break;
        default:
          console.log("Unexpected message received. No action taken.");
      } 
});
