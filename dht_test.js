const chalk = require('chalk');
var schedule = require('node-schedule');
var sensorLib = require("node-dht-sensor");
var sensor = require("node-dht-sensor");


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
let clientID = 5;
let MQTTchannel = "459123459";
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')


// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();


// Connect to public MQTT broker and start listening for commands from the host.
client.on('connect', function () {
    client.subscribe(MQTTchannel, function (err) {
        if (err) {
            console.log(err);
        }
    })
})

console.log("Client " + clientID + " is running and listening for commands! :)");
client.publish(MQTTchannel, 'Client ' + clientID + ' is online!');

// var app = {
//     sensors: [
//         {
//             name: "Big Hive",
//             type: 11,
//             pin: 3
//         },
//         {
//             name: "Little Hive",
//             type: 11,
//             pin: 4
//         }
//     ],
//     read: function () {
//         let index = 0;
//         for (var sensor in this.sensors) {
//             index++;
//             var readout = sensorLib.read(
//                 this.sensors[sensor].type,
//                 this.sensors[sensor].pin
//             );
//             if (index === 1) {
//                 data1 = readout;
//                 sensor1 = sensor;
//             }
//             if (index === 2) {
//                 data2 = readout;
//                 sensor2 = sensor;
//             }
//         }
//     }
// };


// For client listening to command publisher: 
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    if(message.toString() === "SHTEMP"){
        sensor.read(11, 4, function(err, temperature, humidity) {
            if (!err) {
              client.publish(MQTTchannel, "SHTEMP_" + temperature);
            }
            else{client.publish(MQTTchannel, "SHTEMP_ERROR!!!");}
          });
    }
    if(message.toString() === "BHTEMP"){
        sensor.read(11, 3, function(err, temperature, humidity) {
            if (!err) {
              client.publish(MQTTchannel, "BHTEMP_" + temperature);
            }
            else{client.publish(MQTTchannel, "BHTEMP_ERROR!!!");}
          });
    }
    if(message.toString() === "SHHUMID"){
        sensor.read(11, 4, function(err, temperature, humidity) {
            if (!err) {
              client.publish(MQTTchannel, "SHHUMID_" + humidity);
            }
            else{client.publish(MQTTchannel, "SHHUMID_ERROR!!!");}
          });
    }
    if(message.toString() === "BHHUMID"){
        sensor.read(11, 3, function(err, temperature, humidity) {
            if (!err) {
              client.publish(MQTTchannel, "BHHUMID_" + humidity);
            }
            else{client.publish(MQTTchannel, "BHHUMID_ERROR!!!");}
          });
    }
  })


// setTimeout(function () {
//     console.log(
//         `[${sensor1.name}] ` +
//         `temperature: ${data1.temperature.toFixed(1) * 1.8 + 32}°F, ` +
//         `humidity: ${data1.humidity.toFixed(1)}%`
//     );

//     console.log(
//         `[${sensor2.name}] ` +
//         `temperature: ${data2.temperature.toFixed(1) * 1.8 + 32}°F, ` +
//         `humidity: ${data2.humidity.toFixed(1)}%`
//     );
// }, 10000)


// console.log(
//     `[${this.sensors[sensor].name}] ` +
//     `temperature: ${readout.temperature.toFixed(1) * 1.8 + 32}°F, ` +
//     `humidity: ${readout.humidity.toFixed(1)}%`
// );