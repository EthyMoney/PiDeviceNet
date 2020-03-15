const raspi = require('raspi');
const pwm = require('raspi-pwm');
 
raspi.init(() => {
  const led = new pwm.PWM({'pin': 'P1-12', 'frequency': 2500}); // GPIO pin 12, 2.5 KHz PWM frequency
  led.write(0.2); // 20% Duty Cycle, aka half brightness
});
