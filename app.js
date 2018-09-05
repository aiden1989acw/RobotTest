/* Generate a python process using nodejs child_process module */
const spawn = require('child_process').spawn;
let servoToRd = 1;
let servoPosReq = 500;
const py_process = spawn('python', ["./lx16a.py", arg1 = servoToRd, arg2 = servoPosReq]);


/* Define what to do on everytime node application receives data from py_process */
py_process.stdout.once('data', function(data){
    console.log('Reading servo data')
    var logData = JSON.parse(data)
    var showData = logData.split(" ")
console.log(`ID: ${showData[0]} Temp: ${showData[1]}C Pos: ${showData[2]} Voltage: ${showData[3]} v ` )
});

   
