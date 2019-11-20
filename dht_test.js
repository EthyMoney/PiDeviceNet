var rpio = require('rpio');
var dht = require('dht-sensor');
const chalk = require('chalk');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// What this is: Simple test program to test and verify reading DHT-11 temperature/humidity sensors.
//
// STATUS: In progress, not ready to use yet!
//
// Currently only the DHT11 sensors are being tested here. DHT10 will come next once DHT11 is working well.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



// WARNING: AHHHHHHHHH Still need to add the dht-sensor package for this work!



// This will wait for data that never comes, which keeps this process from terminating.
//process.stdin.resume(); //Disabled for now


/*
 * Grab current reading from the sensor. (can only do this at 1Hz)
 */
var current = dht.read(11, 4); // 11 : DHT11, 4 : GPIO Pin Number

// Log the data gathered for checking output
console.log(chalk.cyan("Humidity: " + chalk.green(current.humidity)));
console.log(chalk.cyan("Temperature: " + chalk.green(current.temperature)));