//Mapping of all Dualshock 4 Controller button and analogue data

var dualShock = require('dualshock-controller');

//pass options to init the controller.
var controller = dualShock(
    {
        //you can use a ds4 by uncommenting this line.
        //config: "dualshock4-generic-driver",
        //if using ds4 comment this line.
        config : "dualShock4-alternate-driver",
       //smooths the output from the acelerometers (moving averages) defaults to true
        accelerometerSmoothing : true,
        //smooths the output from the analog sticks (moving averages) defaults to false
        analogStickSmoothing : true
    });
 
//make sure you add an error event handler
controller.on('error', err => (err));
 
//DualShock 4 control rumble and light settings for the controller
controller.setExtras({
  rumbleLeft:  0,   // 0-255 (Rumble left intensity)
  rumbleRight: 0,   // 0-255 (Rumble right intensity)
  red:         0,   // 0-255 (Red intensity)
  green:       75,  // 0-255 (Blue intensity)
  blue:        225, // 0-255 (Green intensity)
  flashOn:     40,  // 0-255 (Flash on time)
  flashOff:    10   // 0-255 (Flash off time)
});
  
//connection status:
controller.on('connected', () => console.log('connected'));

//analogue movements:
controller.on('left:move', data => ('left Moved: ' + data.x + ' | ' + data.y));
controller.on('right:move', data => ('right Moved: ' + data.x + ' | ' + data.y));

//L1 button pressed + released:
controller.on('l1:press', () => ('L1 pressed'));
controller.on('l1:release', () => ('L1 released'));
//L2 button pressed + released:
controller.on('l2:press', () => ('L2 pressed'));
controller.on('l2:release', () => ('L2 released'));
//L3 button pressed + released:
controller.on('leftStick:press', () => ('L3 pressed'));
controller.on('leftStick:release', () => ('L3 released'));
//R1 button pressed + released:
controller.on('r1:press', () => ('R1 pressed'));
controller.on('r1:release', () => ('R1 released'));
//R2 button pressed + released:
controller.on('r2:press', () => ('R2 pressed'));
controller.on('r2:release', () => ('R2 released'));
//R3 button pressed + released:
controller.on('rightStick:press', () => ('R3 pressed'));
controller.on('rightStick:release', () => ('R3 released'));
//triangle button pressed + released:
controller.on('triangle:press', () => ('triangle pressed'));
controller.on('triangle:release', () => ('triangle released'));
//circle button pressed + released:
controller.on('circle:press', () => ('circle pressed'));
controller.on('circle:release', () => ('circle released'));
//cross button pressed + released:
controller.on('x:press', () => ('cross pressed'));
controller.on('x:release', () => ('cross released'));
//square button pressed + released:
controller.on('square:press', ()=> ('square pressed'));
controller.on('square:release', ()=> ('square released'));
//dpadUp button pressed + released:
controller.on('dpadUp:press', ()=> ('dpad Up pressed'));
controller.on('dpadUp:release', ()=> ('dpad Up released'));
//dpadUpRight button pressed + released:
controller.on('dpadUpRight:press', ()=> ('dpad Up Right pressed'));
controller.on('dpadUpRight:release', ()=> ('dpad Up Right released'));
//dpadRight button pressed + released:
controller.on('dpadRight:press', ()=> ('dpad Right pressed'));
controller.on('dpadRight:release', ()=> ('dpad Right released'));
//dpadDownRight button pressed + released:
controller.on('dpadDownRight:press', ()=> ('dpad Down Right pressed'));
controller.on('dpadDownRight:release', ()=> ('dpad Down Right released'));
//dpadDown button pressed + released:
controller.on('dpadDown:press', ()=> ('dpad Down pressed'));
controller.on('dpadDown:release', ()=> ('dpad Down released'));
//dpadDownLeft button pressed + released:
controller.on('dpadDownLeft:press', ()=> ('dpad Down Left pressed'));
controller.on('dpadDownLeft:release', ()=> ('dpad Down Left released'));
//dpadLeft button pressed + released:
controller.on('dpadLeft:press', ()=> ('dpad Left pressed'));
controller.on('dpadLeft:release', ()=> ('dpad Left released'));
//dpadUpLeft button pressed + released:
controller.on('dpadUpLeft:press', ()=> ('dpad Up Left pressed'));
controller.on('dpadUpLeft:release', ()=> ('dpad Up Left released'));
//options button pressed + released:
controller.on('options:press', ()=> ('options pressed'));
controller.on('options:release', ()=> ('options released'));
//share button pressed + released:
controller.on('share:press', ()=> ('share pressed'));
controller.on('share:release', ()=> ('share released'));


//sixasis motion events:
//the object returned from each of the movement events is as follows:
//{
//    direction : values can be: 1 for right, forward and up. 2 for left, backwards and down.
//    value : values will be from 0 to 120 for directions right, forward and up and from 0 to -120 for left, backwards and down.
//}
 
//DualShock 4 TouchPad
//finger 1 is x1 finger 2 is x2
controller.on('touchpad:x1:active', () => ('touchpad one finger active'));
 
controller.on('touchpad:x2:active', () => ('touchpad two fingers active'));
 
controller.on('touchpad:x2:inactive', () => ('touchpad back to single finger'));
 
controller.on('touchpad:x1', data => ('touchpad x1:', data.x, data.y));
 
controller.on('touchpad:x2', data => ('touchpad x2:', data.x, data.y));
 
 
//right-left movement
controller.on('rightLeft:motion', data => (data));
 
//forward-back movement
controller.on('forwardBackward:motion', data => (data));
 
//up-down movement
controller.on('upDown:motion', data => (data));
 
//controller status
//as of version 0.6.2 you can get the battery %, if the controller is connected and if the controller is charging
controller.on('battery:change', data => (data));
 
controller.on('connection:change', data => (data));
 
controller.on('charging:change', data => (data));

module.exports = controller;