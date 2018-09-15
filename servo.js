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
let portNum = 11;
let SerialcomPort = 'COM' + portNum;
let servosConected = 3;

// Function to acquire data from servo by opening a new python process */
function getServoData() {
    /* Generate a python process using nodejs child_process module */
    const spawn = require('child_process').spawn;
    const py_process = spawn('python', ["./lx16a.py", arg1 = servoToRd, arg2 = servoPosReq[20], arg3 = SerialcomPort]);

    /* Define what to do on everytime node application receives data from py_process */
    py_process.stdout.on('data', function (data) {
        //console.log('Servo data acquired')
        var logData = JSON.parse(data);
        let showData = logData.split(" ");
        //console.log(`ID: ${showData[0]} Temp: ${showData[1]}C Pos: ${showData[2]} Voltage: ${showData[3]} v `)
        servoID = (`${showData[0]}`);
        servoTemp = (`${showData[1]}C`);
        servoPos = (`${showData[2]}`);
        servoVolts = (`${showData[3]} v`);
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
    if (servoToRd >= 21) {
        servoToRd = 1;
    }
    //console.log(`About to read ID ${servoToRd}`)
    getServoData();
    console.log(`Read ID ${servoToRd} complete`)
    if (servoToRd && servoID == 1) {
        io.emit('servo data update1', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 2) {
        io.emit('servo data update2', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 3) {
        io.emit('servo data update3', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 4) {
        io.emit('servo data update4', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 5) {
        io.emit('servo data update5', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 6) {
        io.emit('servo data update6', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 7) {
        io.emit('servo data update7', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 8) {
        io.emit('servo data update8', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 9) {
        io.emit('servo data update9', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 10) {
        io.emit('servo data update10', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 11) {
        io.emit('servo data update11', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 12) {
        io.emit('servo data update12', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 13) {
        io.emit('servo data update13', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 14) {
        io.emit('servo data update14', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 15) {
        io.emit('servo data update15', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 16) {
        io.emit('servo data update16', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 17) {
        io.emit('servo data update17', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 18) {
        io.emit('servo data update18', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 19) {
        io.emit('servo data update19', servoID, servoTemp, servoPos, servoVolts);
    }
    //console.log(`About to read ID ${servoToRd}`)
    if (servoToRd && servoID == 20) {
        io.emit('servo data update20', servoID, servoTemp, servoPos, servoVolts);
    }
    servoToRd++;
}, 100);

// Receive Slider Data to Servos 1 to 20//
client.sockets.on('connection', function (socket) {
    socket.on('connection', function () {
        console.log('Client connected');
    });
    socket.on('Servo1PosRequired', function (data) {
        socket.emit('packet1', data);
        servoPosReq[1] = data;
        console.log('Servo 1 Position Required:' + ' ' + servoPosReq[1]);
    });
    socket.on('Servo2PosRequired', function (data) {
        socket.emit('packet2', data);
        servoPosReq[2] = data;
        console.log('Servo 2 Position Required:' + ' ' + servoPosReq[2]);
    });
    socket.on('Servo3PosRequired', function (data) {
        socket.emit('packet3', data);
        servoPosReq[3] = data;
        console.log('Servo 3 Position Required:' + ' ' + servoPosReq[3]);
    });
    socket.on('Servo4PosRequired', function (data) {
        socket.emit('packet4', data);
        servoPosReq[4] = data;
        console.log('Servo 4 Position Required:' + ' ' + servoPosReq[4]);
    });
    socket.on('Servo5PosRequired', function (data) {
        socket.emit('packet5', data);
        servoPosReq[5] = data;
        console.log('Servo 5 Position Required:' + ' ' + servoPosReq[5]);
    });
    socket.on('Servo6PosRequired', function (data) {
        socket.emit('packet6', data);
        servoPosReq[6] = data;
        console.log('Servo 6 Position Required:' + ' ' + servoPosReq[6]);
    });
    socket.on('Servo7PosRequired', function (data) {
        socket.emit('packet7', data);
        servoPosReq[7] = data;
        console.log('Servo 7 Position Required:' + ' ' + servoPosReq[7]);
    });
    socket.on('Servo8PosRequired', function (data) {
        socket.emit('packet8', data);
        servoPosReq[8] = data;
        console.log('Servo 8 Position Required:' + ' ' + servoPosReq[8]);
    });
    socket.on('Servo9PosRequired', function (data) {
        socket.emit('packet9', data);
        servoPosReq[9] = data;
        console.log('Servo 9 Position Required:' + ' ' + servoPosReq[9]);
    });
    socket.on('Servo10PosRequired', function (data) {
        socket.emit('packet10', data);
        servoPosReq[10] = data;
        console.log('Servo 10 Position Required:' + ' ' + servoPosReq[10]);
    });
    socket.on('Servo11PosRequired', function (data) {
        socket.emit('packet11', data);
        servoPosReq[11] = data;
        console.log('Servo 11 Position Required:' + ' ' + servoPosReq[11]);
    });
    socket.on('Servo12PosRequired', function (data) {
        socket.emit('packet12', data);
        servoPosReq[12] = data;
        console.log('Servo 12 Position Required:' + ' ' + servoPosReq[12]);
    });
    socket.on('Servo13PosRequired', function (data) {
        socket.emit('packet13', data);
        servoPosReq[13] = data;
        console.log('Servo 13 Position Required:' + ' ' + servoPosReq[13]);
    });
    socket.on('Servo14PosRequired', function (data) {
        socket.emit('packet14', data);
        servoPosReq[14] = data;
        console.log('Servo 14 Position Required:' + ' ' + servoPosReq[14]);
    });
    socket.on('Servo15PosRequired', function (data) {
        socket.emit('packet15', data);
        servoPosReq[15] = data;
        console.log('Servo 15 Position Required:' + ' ' + servoPosReq[15]);
    });
    socket.on('Servo16PosRequired', function (data) {
        socket.emit('packet16', data);
        servoPosReq[16] = data;
        console.log('Servo 16 Position Required:' + ' ' + servoPosReq[16]);
    });
    socket.on('Servo17PosRequired', function (data) {
        socket.emit('packet17', data);
        servoPosReq[17] = data;
        console.log('Servo 17 Position Required:' + ' ' + servoPosReq[17]);
    });
    socket.on('Servo18PosRequired', function (data) {
        socket.emit('packet18', data);
        servoPosReq[18] = data;
        console.log('Servo 18 Position Required:' + ' ' + servoPosReq[18]);
    });
    socket.on('Servo19PosRequired', function (data) {
        socket.emit('packet19', data);
        servoPosReq[19] = data;
        console.log('Servo 19 Position Required:' + ' ' + servoPosReq[19]);
    });
    socket.on('Servo20PosRequired', function (data) {
        socket.emit('packet20', data);
        servoPosReq[20] = data;
        console.log('Servo 20 Position Required:' + ' ' + servoPosReq[20]);
    });
});

http.listen(3000, function () {
    console.log(`Listening on ${serverPort} `);
});