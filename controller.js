var servocontroller = require('./src/dualshock4');

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

const scaleX = (x) => {
     return parseInt((servoMin-servoMax)*(x-stickMin)/(stickMax-stickMin)+servoMax);
     //return x
}
const sendToServo = (x) => {
  console.log(x);
  }

//Left + Right Analogue Stick Data 
servocontroller.on('left:move', data => {
  stickLeftX = data.y
  stickLeftY = data.x
  sendToServo(scaleX(stickLeftX));
 });
servocontroller.on('right:move', data => {
  stickRightX = data.x;
  //console.log('stick right X' + stickRightX),
  stickRightY = data.y;
  //console.log('stick right Y' + stickRightY)
});

