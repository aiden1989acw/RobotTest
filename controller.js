var HID = require('node-hid');
var exports = module.exports = {};
//Declare Dualshock Analogue stick variables
let stickLeftX;
let stickLeftY;
let stickRightX;
let stickRightY;
let L1 = false; let L2; let L3; let R1; let R2; let R3;
let ServoPositionReq = 0;

//Maximum  and Minimum Scale values for Dualshock Analogue sticks and the servos 
const stickMax =  255;
const stickMin =  0;
const servoMax =  1000;
const servoMin =  0;

//Initiate the raw signals from the HID interface via Bluetooth
var controller = new HID.HID(1356, 2508);

//Scaling Servo Data
const scaleX = (x) => {
  return parseInt((servoMin-servoMax)*(x-stickMin)/(stickMax-stickMin)+servoMax);  
};

//Map Raw Analog Controller Bluetooth Signals
controller.on('data', function(data) {
    stickLeftX  = (data[1]); //Left Analog Stick X
    stickLeftY  = (data[2]); //Left Analog Stick Y
    stickRightX = (data[3]); //Right Analog Stick X
    stickRightY = (data[4]); //Right Analog Stick Y
    ServoPositionReq = scaleX(stickRightY); 
//console.log(ServoPositionReq);
{
  module.exports.ServoPos = ServoPositionReq;
  //console.log(module.exports.ServoPos);
  }
}
);






