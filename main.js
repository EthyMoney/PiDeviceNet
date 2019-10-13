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

// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

// Connect to public MQTT broker and publish status to other clients.
client.on('connect', function () {
    client.publish('459123459', 'Server Has Started!');
    console.log("Host is running and ready to dispatch commands! :)");
    // Listen to responses from clients
    client.subscribe('459123459', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Let's try sending a command to our lovely clients after 6 seconds
setTimeout(function () {
    client.publish('459123459', 'RL1ON')
}, 6000);

// Let's try sending a command to our lovely clients after 12 seconds
setTimeout(function () {
    client.publish('459123459', 'RL1OFF')
}, 12000);

// Let's try sending a command to our lovely clients after 20 seconds
setTimeout(function () {
    client.publish('459123459', 'RL1STAT')
}, 20000);


client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    if(message.toString() === "RL1STAT_ON"){
        console.log("RL1 is currently ON");
    }
    if(message.toString() === "RL1STAT_OFF"){
        console.log("RL1 is currently OFF");
    }
});