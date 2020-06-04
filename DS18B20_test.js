var ds18b20 = require('ds18b20');
let MQTTchannel_Temp = "pi9_aircon/temp";
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.28');

// Heads up!!! To get the sensor ID to use, you need to check what the 1-wire ID of your connected sensor is first.
// Do this with ---->   ls /sys/bus/w1/devices/

// Copy the xx-xxxxxxxxxxxx value and put it here:
let deviceID = '28-01192e131195';




// async calls

// default decimal parser
// ds18b20.temperature(deviceID, function (err, value) {
//   console.log('Current temperature is ', value);
// });

// while the default parser is the decimal one. You can use the hex one by setting an option like this:
// ds18b20.temperature('10-00080283a977', { parser: 'hex' }, function (err, value) {
//   console.log('Current temperature is', value);
// });




// sync calls 

//console.log('Current temperature is: ' + ds18b20.temperatureSync(deviceID)); //decimal parser (less precise)

//console.log('Current temperature is: ' + cToF(ds18b20.temperatureSync(deviceID, { parser: 'hex' }))); //hex parser (more precise)




// exactly what it looks like
function cToF(celsius) {
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  console.log("Conversion c: " + celsius);
  console.log("Conversion f: " +cToFahr);
  return cToFahr.toFixed(1);
}




// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();

client.on('connect', function () {
  client.subscribe(MQTTchannel_Temp, function (err) {
    if (err) {
      console.error(err);
    }
  });
});

function reportTemp() {
  client.publish(MQTTchannel_Temp, cToF(ds18b20.temperatureSync(deviceID, { parser: 'hex' })) + "");
}

// Run once at startup
reportTemp();

// Then do update every minute
setInterval(function () {
  reportTemp();
}, 60000);