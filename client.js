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

*** This file is the client that run on the Pis that are distibuted around the home and will listen to commands
from the main host Pi over MQTT. This file is meant to be rather generic so it can be dropped onto any pi and simply
change the client #, and then add or remove whatever specific functionality you want that pi to support.


Author: Logan (YoloSwagDogDiggity)
Version: 0.2.0 (InDev)
Started: 10/12/2019
*/



//##################################################################
//                     Setup and Declarations
//##################################################################

// IMPORTANT!! This defines the client ID number of the program. Set this number for whatever unique pi you put this program onto.
let clientID = 1;

// IMPORTANT!! These define the pinouts to use for whatever devices you have. Not all of these have to be used, just set the
// ones you will use with your particuluar client.
let relay1 = 14;
let relay2;
let relay3;
let i2cLCD;
let PWMvrm = 'P1-12'

/* IMPORTANT!! This value defines the MQTT channel to listen and publish to. It can be a string of your choosing, but make sure 
it matches your other devices so everything is on the same channel to communicate. WARNING: This channel can be listened 
and published to by anyone that knows what it is. Be sure to keep this value private if your application controls sensitive
devices in your use case. Makes for a pretty fun prank to play on a buddy tho ;) */
let MQTTchannel = "459123459";
let PWMtopic = `${MQTTchannel}` + _PWM_ + `${clientID}`;

// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();


var rpio = require('rpio');
rpio.init({gpiomem: true});   // You may need to switch this to the devmem pool when using PWM and i2c
rpio.init({mapping: 'gpio'}); 
const raspi = require('raspi');
const pwm = require('raspi-pwm');

var mqtt = require('mqtt')
var client = mqtt.connect('192.168.1.28')

// Connect to public MQTT broker and start listening for commands from the host.
client.on('connect', function () {
    client.subscribe([MQTTchannel,PWMtopic] , function (err) {
        if(err){
            console.log(err);
        }
    })
  })

// Set relay to OFF right away upon startup.
relayOFF();



//##################################################################
//                         Relay Control
//##################################################################

// Note: High is OFF, Low is ON!
// Upon bootup, the setting is LOW! Because of this you will want to default to HIGH (OFF) right away.

function relayON(relayID){
    //open the pin and close the selected relay
    rpio.open(relayID, rpio.OUTPUT, rpio.LOW); // Sets to Low (ON)
}

function relayOFF(relayID){
    //close the pin which resets to the relay being open
    rpio.close(relayID, rpio.PIN_RESET); // Resets to High (OFF)
}

//report the current state of all in-use relays
function reportStatus(){
    client.publish(MQTTchannel, `RL${clientID}STAT_` + (rpio.read(relay1) ? 'OFF' : 'ON'));
}



//##################################################################
//                          LCD Control
//##################################################################

// Coming soon!!



//##################################################################
//                          VRM Control
//##################################################################

function setDutyCycle(duty){
    raspi.init(() => {
        const led = new pwm.PWM(PWMvrm, 2500); // GPIO pin 12, 2.5 KHz PWM frequency
        led.write(duty);
      });
}



//##################################################################
//                         Event Handlers
//##################################################################

console.log(`Client ${clientID} is running and listening for commands! :)`);
client.publish(MQTTchannel, `Client ${clientID} is online!`);

// For client listening to command publisher: 
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    if(message.toString() === `RL${clientID}ON`){
        relayON(relay1);
    }
    if(message.toString() === `RL${clientID}OFF`){
        relayOFF(relay1);
    }
    if(message.toString() === `RL${clientID}STAT`){
        reportStatus();
    }
    if(topic.toString() === PWMtopic){
        setDutyCycle(parseFloat(message.toString()));
    }
  })



//##################################################################
//                      Supporting Functions
//##################################################################

// These will be here to help complete other tasks or provide validations and testing before running a command.

// TO-DO:
function validateLCDText(message){
    // Check a message for being of right length and format prior to sending to the LCD to display. (for a 20x4 char LCD)
}

