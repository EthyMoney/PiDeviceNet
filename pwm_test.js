const raspi = require('raspi');
const pwm = require('raspi-pwm');
 
raspi.init(() => {
  const led = new pwm.PWM('P1-12', 2500); // GPIO pin 12, 2.5 KHz PWM frequency
  led.write(0.5); // 50% Duty Cycle, aka half brightness
});