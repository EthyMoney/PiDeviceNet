const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');

raspi.init(() => {
  const led = new pwm.SoftPWM({'pin': 'GPIO12', 'frequency': 2500}); // GPIO pin 12, 2.5 KHz PWM frequency
  led.write(0.2); // 20% Duty Cycle, aka half brightness
});
