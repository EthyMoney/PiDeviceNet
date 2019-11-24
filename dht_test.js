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



let j = schedule.scheduleJob('* * * * *', function(){

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
        read: function() {
          for (var sensor in this.sensors) {
            var readout = sensorLib.read(
              this.sensors[sensor].type,
              this.sensors[sensor].pin
            );
            console.log(
              `[${this.sensors[sensor].name}] ` +
                `temperature: ${readout.temperature.toFixed(1)}°C, ` +
                `humidity: ${readout.humidity.toFixed(1)}%`
            );
          }
          setTimeout(function() {
            app.read();
          }, 2000);
        }
      };
       
      app.read();

}); //end of scheduled task
