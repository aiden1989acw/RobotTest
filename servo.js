var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = require('socket.io').listen(3001);
let serverPort = 3000;

// Instances of Servo Read Data */
let servoID;
let servoTemp;
let servoPos;
let servoVolts;

// Setting up communications to servo control python program */
let servoToRd = 1;
let servoPosReq = [];
let portNum = 3;
let SerialcomPort = 'COM' + portNum;
let servosConected = 3;

// Function to acquire data from servo by opening a new python process */
function getServoData() {
    /* Generate a python process using nodejs child_process module */
    const spawn = require('child_process').spawn;
    const py_process = spawn('python', ["./lx16a.py", arg1 = servoToRd, arg2 = servoPosReq[1], arg3 = SerialcomPort]);

    /* Define what to do on everytime node application receives data from py_process */
    py_process.stdout.on('data', function (data) {
        //console.log('Servo data acquired')
        var logData = JSON.parse(data)
        let showData = logData.split(" ")
        //console.log(`ID: ${showData[0]} Temp: ${showData[1]}C Pos: ${showData[2]} Voltage: ${showData[3]} v `)
        servoID = (`${showData[0]}`)
        servoTemp = (`${showData[1]}C`)
        servoPos = (`${showData[2]}`)
        servoVolts = (`${showData[3]} v`)
    });
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('New Client Connected');
});
//Poll through servos to acquire data//   
setInterval(function () {
    if (servoToRd >= 3) {
        servoToRd = 1
    }
    //console.log(`About to read ID ${servoToRd}`)
    getServoData()
    //console.log(`Read ID ${servoToRd} complete`)
    if (servoToRd && servoID == 1) {
        io.emit('servo data update1', servoID, servoTemp, servoPos, servoVolts)
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 2) {
        io.emit('servo data update2', servoID, servoTemp, servoPos, servoVolts)
    }
    servoToRd++
}, 500);

// Receive Slider Data to Servos 1 and 2//
client.sockets.on('connection', function (socket) {
    socket.on('connection', function () {
        console.log('Client connected')
    })
    socket.on('Servo1PosRequired', function (data) {
        socket.emit('packet0', data)
        servoPosReq[1] = data;
        console.log('Servo 1 Position Required:' + ' ' + servoPosReq[1]);
    })
    socket.on('Servo2PosRequired', function (data) {
        socket.emit('packet1', data)
        servoPosReq[2] = data;
        console.log('Servo 2 Position Required:' + ' ' + servoPosReq[2]);
    })
})

http.listen(3000, function () {
    console.log(`Listening on ${serverPort} `);
});