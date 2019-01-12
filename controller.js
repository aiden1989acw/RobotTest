var HID = require('node-hid');
//console.log(HID.devices());

//Declare Dualshock Analogue stick variables
let stickLeftX;
let stickLeftY;
let stickRightX;
let stickRightY;


//Maximum  and Minimum Scale values for Dualshock Analogue sticks and the servos 
const stickMax =  255;
const stickMin =  0;
const servoMax =  1000;
const servoMin =  0;

//Initiate the raw signals from the HID interface via Bluetooth
var controller = new HID.HID(1356, 2508);
var x = 0;

//Map Raw Controller Bluetooth Signals
controller.on('data', function(data) {
  if (x === 30) {
    stickLeftX  = (data[3]); //Left Analog Stick X
    stickLeftY  = (data[4]); //Left Analog Stick Y
    stickRightX = (data[5]); //Right Analog Stick X
    stickRightY = (data[6]); //Right Analog Stick Y
  }
    x = (x + 1) % 31;
  });

const scaleX = (x) => {
     return parseInt((servoMin-servoMax)*(x-stickMin)/(stickMax-stickMin)+servoMax);
    
};
const sendToServo = (val) => {
  console.log(val);
  };
controller.on('data', () => sendToServo(scaleX(stickRightY))
);
 







