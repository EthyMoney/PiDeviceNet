const chalk = require('chalk');
var schedule = require('node-schedule');
var sensorLib = require("node-dht-sensor");


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// What this is: Simple test program to test and verify reading DHT-11 temperature/humidity sensors.
//
// STATUS: In progress, not ready to use yet!
//
// Currently only the DHT11 sensors are being tested here. DHT10 will come next once DHT11 is working well.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////




// This will wait for data that never comes, which keeps this process from terminating.
//process.stdin.resume(); //Disabled for now
let data1;
let sensor1;
let data2;
let sensor2;


var app = {
    sensors: [
        {
            name: "Big Hive",
            type: 11,
            pin: 3
        },
        {
            name: "Little Hive",
            type: 11,
            pin: 4
        }
    ],
    read: function () {
        let index = 0;
        for (var sensor in this.sensors) {
            index++;
            var readout = sensorLib.read(
                this.sensors[sensor].type,
                this.sensors[sensor].pin
            );
            if(index === 1){
                data1 = readout;
                sensor1 = sensor;
            }
            if(index === 2){
                data2 = readout;
                sensor2 = sensor;
            }
        }
    }
};

app.read();

setTimeout(function(){
    console.log(
        `[${sensor1.name}] ` +
        `temperature: ${data1.temperature.toFixed(1) * 1.8 + 32}°F, ` +
        `humidity: ${data1.humidity.toFixed(1)}%`
    );

    console.log(
        `[${sensor2.name}] ` +
        `temperature: ${data2.temperature.toFixed(1) * 1.8 + 32}°F, ` +
        `humidity: ${data2.humidity.toFixed(1)}%`
    );
}, 10000)


// console.log(
//     `[${this.sensors[sensor].name}] ` +
//     `temperature: ${readout.temperature.toFixed(1) * 1.8 + 32}°F, ` +
//     `humidity: ${readout.humidity.toFixed(1)}%`
// );