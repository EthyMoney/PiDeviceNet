/*
 /$$$$$$$ /$$       /$$$$$$$                    /$$                         /$$   /$$           /$$    
| $$__  $|__/      | $$__  $$                  |__/                        | $$$ | $$          | $$    
| $$  \ $$/$$      | $$  \ $$ /$$$$$$ /$$    /$$/$$ /$$$$$$$ /$$$$$$       | $$$$| $$ /$$$$$$ /$$$$$$  
| $$$$$$$| $$      | $$  | $$/$$__  $|  $$  /$$| $$/$$_____//$$__  $$      | $$ $$ $$/$$__  $|_  $$_/  
| $$____/| $$      | $$  | $| $$$$$$$$\  $$/$$/| $| $$     | $$$$$$$$      | $$  $$$| $$$$$$$$ | $$    
| $$     | $$      | $$  | $| $$_____/ \  $$$/ | $| $$     | $$_____/      | $$\  $$| $$_____/ | $$ /$$
| $$     | $$      | $$$$$$$|  $$$$$$$  \  $/  | $|  $$$$$$|  $$$$$$$      | $$ \  $|  $$$$$$$ |  $$$$/
|__/     |__/      |_______/ \_______/   \_/   |__/\_______/\_______/      |__/  \__/\_______/  \___/     ------> Client


Description: My personal tool to control my LEDs and stuff. This program will have the end goal of communicating
with other rPis around my room and managing the flow of commands between them to control devices. For now, this program
is being used to directly test control of devices, and will later be adapted to pass on this control to other rPis.

*** This file is the client that run on the Pis that are distibuted around the home and will listen to commands from the main host Pi over MQTT.

Author: Logan (YoloSwagDogDiggity)
Version: 1.0.0 (InDev)
Date: 10/12/2019
*/


//##################################################################
//                    Setup and Declarations
//##################################################################

// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();


var rpio = require('rpio');
rpio.init({gpiomem: true});
rpio.init({mapping: 'gpio'}); 


var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

// Connect to public MQTT broker and start listening for commands from the host.
client.on('connect', function () {
    client.subscribe('459123459', function (err) {
        if(err){
            console.log(err);
        }
    })
  })

  // Set relay to OFF right away upon startup.
  //relayOFF();



//##################################################################
//                         Relay Control (In Testing)
//##################################################################

// Note: High is OFF, Low is ON!
// Upon bootup, the setting is LOW! Because of this you will want to default to HIGH (OFF) right away.

function relayON(){
    //open the pin and close the relay
    rpio.open(14, rpio.OUTPUT, rpio.LOW); // Sets to Low (ON)
}

function relayOFF(){
    //close the pin which resets to the relay being open
    rpio.close(14, rpio.PIN_RESET); // Resets to High (OFF)
}

function ReportStatus(){
    if(rpio.read(14) === false){
        client.publish('459123459', 'RL1STAT_ON')
    }
    if(rpio.read(14) === true){
        client.publish('459123459', 'RL1STAT_OFF')
    } 
}



//##################################################################
//                       Event Handlers
//##################################################################

console.log("Client is running and listening for commands! :)");

// For client listening to command publisher: 
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    if(message.toString() === "RL1ON"){
        relayON();
    }
    if(message.toString() === "RL1OFF"){
        relayOFF();
    }
    if(message.toString() === "RL1STAT"){
        ReportStatus();
    }
  })


