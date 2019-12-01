const sensor = require("node-dht-sensor").promises;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// What this is: Simple test program to test and verify reading DHT-11 temperature/humidity sensors.
//
// STATUS: In progress, not ready to use yet!
//
// Currently only the DHT11 sensors are being tested here. DHT10 will come next once DHT11 is working well.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



let clientID = 2;
let MQTTchannel_Temp = "459123459_shtemp";
let MQTTchannel_Humidity = "459123459_shhumid";
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')


// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();

client.on('connect', function () {
    client.subscribe(MQTTchannel_Temp, function (err) {
        if (err) {
            console.error(err);
        }
    })
    client.subscribe(MQTTchannel_Humidity, function (err) {
        if (err) {
            console.error(err);
        }
    })
})

// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(message.toString())
//   })

client.publish(MQTTchannel_Temp, 'Client ' + clientID + ' is online!');
client.publish(MQTTchannel_Humidity, 'Client ' + clientID + ' is online!');
console.log("Client " + clientID + " is running and publishing data! :)");


// Pull sensor data and send it to MQTT
async function exec() {
  try {
    const res = await sensor.read(11, 4);
    client.publish(MQTTchannel_Humidity, res.humidity.toString());
    client.publish(MQTTchannel_Temp, (res.temperature * 9/5 + 32).toFixed(1).toString());
  } catch (err) {
    console.error("Failed to read sensor data:", err);
  }
}

// Run at startup
exec();

// Then do update every 30 seconds
setInterval(function(){
    exec();
}, 30000)
