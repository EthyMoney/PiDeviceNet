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

*** This file is the client that run on the Pis that are distributed around the home and will listen to commands
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
let clientID = "pi-kitchen1";

// IMPORTANT!! These define the pin-outs to use for whatever devices you have. Not all of these have to be used, just set the
// ones you will use with your particular client.
let relay1 = 14;
let relay2;
let relay3;
let i2cLCD;
let PWMvrm = 'GPIO12';

/* IMPORTANT!! This value defines the MQTT channel to listen and publish to. It can be a string of your choosing, but make sure 
it matches your other devices so everything is on the same channel to communicate. WARNING: This channel can be listened 
and published to by anyone that knows what it is. Be sure to keep this value private if your application controls sensitive
devices in your use case. Makes for a pretty fun prank to play on a buddy tho ;) */
let MQTTchannel = "home/house/kitchen/lights";
let PWMtopic = "home/house/kitchen/lights/pwm";

// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();


var rpio = require('rpio');
rpio.init({ gpiomem: false, mapping: 'gpio' });   // You may need to switch this to the devmem pool when using PWM and i2c
const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.55');

// Connect to public MQTT broker and start listening for commands from the host.
client.on('connect', function () {
  client.subscribe([MQTTchannel, PWMtopic], function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// Set lights to OFF right away upon startup.
relayOFF(relay1);



//##################################################################
//                         Relay Control
//##################################################################

// Note: High is OFF, Low is ON!
// Upon bootup, the setting is LOW! Because of this you will want to default to HIGH (OFF) right away.
// This is using PWM controller solid state control to turn on or off

function relayON(relayID) {
  //open the pin and close the selected relay
  rpio.open(relayID, rpio.OUTPUT, rpio.LOW); // Sets to Low (ON)
}

function relayOFF(relayID) {
  //close the pin which resets to the relay being open
  rpio.close(relayID, rpio.PIN_RESET); // Resets to High (OFF)
}

//report the current state of all in-use relays
function reportStatus() {
  client.publish(MQTTchannel, `Kitchen1 lights (long side) are ` + (rpio.read(relay1) ? 'OFF' : 'ON'));
}

//set PWM control for light dimming function
function setDutyCycle(duty) {
  raspi.init(() => {
    const led = new pwm.SoftPWM({ 'pin': PWMvrm, 'frequency': 2500 }); // GPIO pin 12, 2.5 KHz PWM frequency
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
  console.log(message.toString());
  if (message.toString().toLowerCase() === `${clientID}-on`) {
    relayON(relay1);
  }
  if (message.toString().toLowerCase() === `${clientID}-off`) {
    relayOFF(relay1);
  }
  if (message.toString().toLowerCase() === `${clientID}-stat`) {
    reportStatus();
  }
  if (topic.toString() === PWMtopic) {
    setDutyCycle(parseFloat(message.toString()));
  }
});

