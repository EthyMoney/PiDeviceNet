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

var rpio = require('rpio');

rpio.init({
    gpiomem: true
}); /* Use /dev/mem for i²c/PWM/SPI */
rpio.init({
    mapping: 'gpio'
}); /* Use the GPIOxx numbering */



//##################################################################
//                    Relay Control OVer PWM
//##################################################################


// Note: High is OFF, Low is ON!
// Upon bootup, the setting is LOW!

rpio.open(14, rpio.OUTPUT, rpio.LOW);

console.log('Pin 14 is currently ' + (rpio.read(14) ? 'high' : 'low'));

setTimeout(function () {
    //rpio.write(14, rpio.LOW); 

    // Write doesn't seem to be working. Use the reset to shut off instead.
    rpio.close(14, rpio.PIN_RESET); // Resets to High (OFF)

    console.log('Pin 14 is currently ' + (rpio.read(14) ? 'high' : 'low'));

}, 4000);