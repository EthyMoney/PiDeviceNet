var rpio = require('rpio');




/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// What this is: Simple test program to write to an LCD with multiple rows over i2c
//
// STATUS: Tested and working!!!!
//
// This will work with 16x2, 16x4, 20x2, and 20x4 LCDs! Tested fully to ensure row address compatibility!
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



// This will wait for data that never comes, which keeps this process from terminating.
process.stdin.resume();


var options = {
        gpiomem: false,
        mapping: 'gpio',
        mock: false,
}
rpio.init(options);

console.log("Writing to LCD!");

/*
 * These LCD line addresses will work for 20x4 and 16x4 4-row LCDs, as well as 2-row LCDs
 */
var init = new Buffer([0x03, 0x03, 0x03, 0x02, 0x28, 0x0c, 0x01, 0x06]);
var LCD_LINE1 = 0x80, LCD_LINE2 = 0xc0; LCD_LINE3 = 0x94; LCD_LINE4 = 0xD4; 
var LCD_ENABLE = 0x04, LCD_BACKLIGHT = 0x08;

/*
 * Data is written 4 bits at a time with the lower 4 bits containing the mode.
 */
function lcdwrite4(data)
{
        rpio.i2cWrite(Buffer([(data | LCD_BACKLIGHT)]));
        rpio.i2cWrite(Buffer([(data | LCD_ENABLE | LCD_BACKLIGHT)]));
        rpio.i2cWrite(Buffer([((data & ~LCD_ENABLE) | LCD_BACKLIGHT)]));
}
function lcdwrite(data, mode)
{
        lcdwrite4(mode | (data & 0xF0));
        lcdwrite4(mode | ((data << 4) & 0xF0));
}

/*
 * Write a string to the specified LCD line.
 */
function lineout(str, addr)
{
        lcdwrite(addr, 0);

        str.split('').forEach(function (c) {
                lcdwrite(c.charCodeAt(0), 1);
        });
}

/*
 * We can now start the program, talking to the i2c LCD at address 0x27.
 */
rpio.i2cBegin();
rpio.i2cSetSlaveAddress(0x27);
rpio.i2cSetBaudRate(10000);

for (var i = 0; i < init.length; i++)
        lcdwrite(init[i], 0);

lineout('12345678901234567890', LCD_LINE1);
lineout('12345678901234567890', LCD_LINE2);
lineout('12345678901234567890', LCD_LINE3);
lineout('12345678901234567890', LCD_LINE4);

rpio.i2cEnd();
