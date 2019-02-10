var HID = require('node-hid');

//Declare Dualshock Analogue stick variables
let stickLeftX;
let stickLeftY;
let stickRightX;
let stickRightY;
let ServoPositionReq = 0;
let ServoToMove = 0;

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

//Increment Function
let i = 0;

function increment(n){
  n++;
  return n;
}
//Decrement Function
function decrement(n){
  n--;
  return n;
}

// L1 Button Press Latch
L1 = function() {
  if(L1.done) return;
  console.log('L1 Pressed');
  L1.done = true;
  if (L1.done == true) {
    ServoToMove = i=increment(i);
  } 
};
// L2 Button Press Latch
L2 = function() {
  if(L2.done) return;
  console.log('L2 Pressed');
  L2.done = true;
  if (L2.done == true) {
    ServoToMove = i=decrement(i);
  } 
};
// L3 Button Press Latch
L3 = function() {
  if(L3.done) return;
  console.log('L3 Pressed');
  L3.done = true;
};
// R1 Button Press Latch
R1 = function() {
  if(R1.done) return;
  console.log('R1 Pressed');
  R1.done = true;
};
// R2 Button Press Latch
R2 = function() {
  if(R2.done) return;
  console.log('R2 Pressed');
  R2.done = true;
};
// R3 Button Press Latch
R3 = function() {
  if(R3.done) return;
  console.log('R3 Pressed');
  R3.done = true;
};

//Map Raw Analog Controller Bluetooth Signals
controller.on('data', function(data) {
    stickLeftX  = (data[1]); //Left Analog Stick X
    stickLeftY  = (data[2]); //Left Analog Stick Y
    stickRightX = (data[3]); //Right Analog Stick X
    stickRightY = (data[4]); //Right Analog Stick Y
    buttons     = (data[6]); // Buttons
    ServoPositionReq = scaleX(stickRightY); 

// L1 Button Register & Reset
  if (data[6] == 1){
    L1();
  }
    else if (data[6] == 0){
    L1.done = false;
  } 
//L2 Button Register & Reset
  if (data[6] == 4){
    L2();
  }
    else if (data[6] == 0){
    L2.done = false;
  } 
//L3 Button Register & Reset
  if (data[6] == 64){
    L3();
  }
    else if (data[6] == 0){
    L3.done = false;
  } 
 //R1 Button Register & Reset 
  if (data[6] == 2){
    R1();
  } else if (data[6] == 0){
    R1.done = false;
  }
 //R2 Button Register & Reset 
  if (data[6] == 8){
    R2();
  } else if (data[6] == 0){
    R2.done = false;
  }
 //R3 Button Register & Reset 
  if (data[6] == 128){
    R3();
  } else if (data[6] == 0){
    R3.done = false;
}

module.exports.ServoPos = ServoPositionReq;
module.exports.ServoNum = ServoToMove;
});








