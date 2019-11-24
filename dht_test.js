var rpio = require('rpio');
var dht = require('dht-sensor');
const chalk = require('chalk');
var schedule = require('node-schedule');


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



var j = schedule.scheduleJob('* * * * *', function(){

/*
 * Grab current reading from the sensor. (can only do this at 1Hz)
 */
var current = dht.read(11, 4); // 11 : DHT11, 4 : GPIO Pin Number
var current2 = dht.read(11, 3); // 11 : DHT11, 3 : GPIO Pin Number

// Log the data gathered for checking output
console.log(chalk.cyan("Humidity: " + chalk.green(current.humidity)));
console.log(chalk.cyan("Temperature: " + chalk.green(current.temperature*1.8+32)));

// Create space to show other sensor
console.log(chalk.blue("----------OTHER ONE:----------"));

// Log the data gathered for checking output
console.log(chalk.cyan("Humidity: " + chalk.green(current2.humidity)));
console.log(chalk.cyan("Temperature: " + chalk.green(current2.temperature*1.8+32)));

console.log(chalk.green("-------------------------------"));

}); //end of scheduled task
