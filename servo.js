var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let serverPort = 3000;
let servoID;
let servoTemp;
let servoPos;
let servoVolts;

//Setting up communications to servo control python program */
let servoToRd = 1;
let servoPosReq = 0;
let portNum = 3;
let SerialcomPort = 'COM' + portNum;
let servosConected = 3;

//Function to acquire data from servo by opening a new python process */
function getServoData() {
    /* Generate a python process using nodejs child_process module */
    const spawn = require('child_process').spawn;
    const py_process = spawn('python', ["./lx16a.py", arg1 = servoToRd, arg2 = servoPosReq, arg3 = SerialcomPort]);

    /* Define what to do on everytime node application receives data from py_process */
    py_process.stdout.on('data', function (data) {
        console.log('Servo data acquired')
        var logData = JSON.parse(data)
        let showData = logData.split(" ")
        console.log(`ID: ${showData[0]} Temp: ${showData[1]}C Pos: ${showData[2]} Voltage: ${showData[3]} v `)
        servoID =(`${showData[0]}`)
        servoTemp =(`${showData[1]}C`)
        servoPos =(`${showData[2]}`)
        servoVolts =(`${showData[3]} v`)
    });
}
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('New Client Connected');
});

//Poll through servos to acquire data//   
setInterval(function () {
            if (servoToRd >= servosConected) {
                servoToRd = 1
            }
            console.log(`About to read ID ${servoToRd}`)
            getServoData()
            console.log(`Read ID ${servoToRd} complete`)
            io.emit('servo data update', servoID, servoTemp, servoPos, servoVolts)
            servoToRd++
     }, 1000);

http.listen(3000, function(){
    console.log(`Listening on ${serverPort} `);
});
