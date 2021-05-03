/*
 /$$$$$$$ /$$       /$$$$$$$                    /$$                         /$$   /$$           /$$    
| $$__  $|__/      | $$__  $$                  |__/                        | $$$ | $$          | $$    
| $$  \ $$/$$      | $$  \ $$ /$$$$$$ /$$    /$$/$$ /$$$$$$$ /$$$$$$       | $$$$| $$ /$$$$$$ /$$$$$$  
| $$$$$$$| $$      | $$  | $$/$$__  $|  $$  /$$| $$/$$_____//$$__  $$      | $$ $$ $$/$$__  $|_  $$_/  
| $$____/| $$      | $$  | $| $$$$$$$$\  $$/$$/| $| $$     | $$$$$$$$      | $$  $$$| $$$$$$$$ | $$    
| $$     | $$      | $$  | $| $$_____/ \  $$$/ | $| $$     | $$_____/      | $$\  $$| $$_____/ | $$ /$$
| $$     | $$      | $$$$$$$|  $$$$$$$  \  $/  | $|  $$$$$$|  $$$$$$$      | $$ \  $|  $$$$$$$ |  $$$$/
|__/     |__/      |_______/ \_______/   \_/   |__/\_______/\_______/      |__/  \__/\_______/  \___/     ------> Mining Rig Resetter


Description: Program for resetting mining rigs with standard PC motherboards by shorting the power button pins in a defined sequence
  to essentially power cycle the rig. This program uses a relay controlled by a raspberry pi in order to simulate someone hard resetting
  the machine using the power button.


Author: Logan (GitHub: YoloSwagDogDiggity)
Version: 1.0.0b (Beta)
Started: 05/03/2021
*/


//##################################################################
//                     Setup and Declarations
//##################################################################

// IMPORTANT!! This defines the client ID of the program. Set this value for whatever unique value you'd 
// like to use to identify this program on your MQTT channel.
let clientID = 'soup3';

// IMPORTANT!! These define the pinouts to use for whatever devices you have. Not all of these have to be used, just set the
// ones you will use with your particuluar client.
let relay1 = 14;

/* IMPORTANT!! This value defines the MQTT channel to listen and publish to. It can be a string of your choosing, but make sure 
it matches your other devices so everything is on the same channel to communicate. WARNING: This channel can be listened 
and published to by anyone that knows what it is. Be sure to keep this value private if your application controls sensitive
devices in your use case. Makes for a pretty fun prank to play on a buddy tho ;) */
let MQTTchannel = "45919-rigs";
let PWMtopic = `${MQTTchannel}/${clientID}`;

// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();


var rpio = require('rpio');
rpio.init({ gpiomem: true });   // You may need to switch this to the devmem pool when using PWM and i2c
rpio.init({ mapping: 'gpio' });

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.28');

// Connect to public MQTT broker and start listening for commands from the host.
client.on('connect', function () {
  client.subscribe([MQTTchannel, PWMtopic], function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// Set relay to OFF right away upon startup.
relayOFF(relay1);


//##################################################################
//                         Relay Control
//##################################################################

// Note: High is OFF, Low is ON!
// Upon bootup, the setting is LOW! Because of this you will want to default to HIGH (OFF) right away.

function relayON(relayID) {
  //open the pin and close the selected relay
  rpio.open(relayID, rpio.OUTPUT, rpio.LOW); // Sets to Low (ON)
}

function relayOFF(relayID) {
  //close the pin which resets to the relay being open
  rpio.close(relayID, rpio.PIN_RESET); // Resets to High (OFF)
}

function resetRig(relayID) {
  // relay on (short), then wait 10 seconds, then back off, then click back on quickly to turn on rig again
  relayON(relayID);
  setTimeout(() => {
    relayOFF(relayID);
  }, 10000);
  relayON(relayID);
  setTimeout(() => {
    relayOFF(relayID);
  }, 500);
}


//report the current state of all in-use relays
function reportStatus() {
  client.publish(MQTTchannel, `${clientID}_STATUS_` + (rpio.read(relay1) ? 'OFF' : 'ON'));
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
  if (message.toString() === `${clientID}-reset`) {
    relayON(relay1);
  }
  if (message.toString() === `RL${clientID}-stat`) {
    reportStatus();
  }
});