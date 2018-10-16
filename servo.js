var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = require('socket.io').listen(3001);
let serverPort = 3000;

app.use(express.static(__dirname));

// Instances of Servo Read Data */
let servoID;
let servoTemp;
let servoPos;
let servoVolts;

// Setting up communications to servo control python program */
let servoToRd = 1;
let servoPosReq;
let servoToMove;
let servoToEnable;
let servosConected = 3;

// Setting up Communications Port for Windows & Linux */
let WinPortNum = 11;
let LinPortNum = 0;
let SerialComPortWindows = 'COM' + WinPortNum;
let SerialComPortLinux = 'ttyUSB' + LinPortNum;

// Controller mapping into servo programme */
let controllerPos;

// Function to acquire data from servo by opening a new python process */
function getServoData() {
    /* Generate a python process using nodejs child_process module */
    const spawn = require('child_process').spawn;
    const py_process = spawn('python', ["./lx16a.py",
        arg1 = SerialComPortWindows,
        arg2 = servoToRd,
        arg3 = servoPosReq,
        arg4 = servoToMove,
    ]);
    
    /* Define what to do on everytime node application receives data from py_process */
    py_process.stdout.on('data', function (data) {
        var logData = JSON.parse(data);
        let showData = logData.split(" ");
        servoID = (`${showData[0]}`);
        servoTemp = (`${showData[1]}`);
        servoPos = (`${showData[2]}`);
        servoVolts = (`${showData[3]} v`);
    });
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('Client Connected');
    socket.on('disconnect', function () {
        console.log('Client Disconnected');
    });
});

io.on('connection', function(socket){
    var proc = require('child_process').fork('./controller.js', [], { silent: true });
    proc.stdout.on('data', function (data) {
        controllerPos = parseInt(data);
        
    });
    
    socket.on('disconnect', function(){
       proc.kill('SIGINT');
        console.log("Controller disconnected by Client");
    });
   
});

//Poll through servos to acquire data//   
setInterval(function () {
    if (servoToRd >= 3) {
        servoToRd = 1;
    }
    //console.log(`About to read ID ${servoToRd}`)
    getServoData();

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
    socket.on('servo1Enable', function (data) { 
        if (data === true) {
            console.log("Servo 1 Motor Enable");
            socket.on('Servo1PosRequired', function (data) {
                socket.emit('packet1', data);
                servoPosReq = data;
                servoToMove = 1;
                console.log('Servo 1 Position Required:' + ' ' + servoPosReq);                
            });
        } else {
           if (data === false) {
                console.log("Servo 1 Motor Disable");
            } 
        }
    });
    socket.on('servo2Enable', function (data) {
        if (data === true) {
            console.log("Servo 2 Motor Enable");
            socket.on('Servo2PosRequired', function (data) {
                socket.emit('packet2', data);
                servoPosReq = data;
                servoToMove = 2;
                console.log('Servo 2 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 2 Motor Disable");
            }
        }
    });
    socket.on('servo3Enable', function (data) {
        if (data === true) {
            console.log("Servo 3 Motor Enable");
            socket.on('Servo3PosRequired', function (data) {
                socket.emit('packet3', data);
                servoPosReq = data;
                servoToMove = 3;
                console.log('Servo 3 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 3 Motor Disable");
            }
        }
    });
    socket.on('servo4Enable', function (data) {
        if (data === true) {
            console.log("Servo 4 Motor Enable");
            socket.on('Servo4PosRequired', function (data) {
                socket.emit('packet4', data);
                servoPosReq = data;
                servoToMove = 4;
                console.log('Servo 4 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 4 Motor Disable");
            }
        }
    });
    socket.on('servo5Enable', function (data) {
        if (data === true) {
            console.log("Servo 5 Motor Enable");
            socket.on('Servo5PosRequired', function (data) {
                socket.emit('packet5', data);
                servoPosReq = data;
                servoToMove = 5;
                console.log('Servo 5 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 5 Motor Disable");
            }
        }
    });
    socket.on('servo6Enable', function (data) {
        if (data === true) {
            console.log("Servo 6 Motor Enable");
            socket.on('Servo6PosRequired', function (data) {
                socket.emit('packet6', data);
                servoPosReq = data;
                servoToMove = 6;
                console.log('Servo 6 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 6 Motor Disable");
            }
        }
    });
   
    socket.on('servo7Enable', function (data) {
        if (data === true) {
            console.log("Servo 7 Motor Enable");
            socket.on('Servo7PosRequired', function (data) {
                socket.emit('packet7', data);
                servoPosReq = data;
                servoToMove = 7;
                console.log('Servo 7 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 7 Motor Disable");
            }
        }
    });
    
   
    socket.on('servo8Enable', function (data) {
        if (data === true) {
            console.log("Servo 8 Motor Enable");
            socket.on('Servo8PosRequired', function (data) {
                socket.emit('packet8', data);
                servoPosReq = data;
                servoToMove = 8;
                console.log('Servo 8 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 8 Motor Disable");
            }
        }
    });
    socket.on('servo9Enable', function (data) {
        if (data === true) {
            console.log("Servo 9 Motor Enable");
            socket.on('Servo9PosRequired', function (data) {
                socket.emit('packet9', data);
                servoPosReq = data;
                servoToMove = 9;
                console.log('Servo 9 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 9 Motor Disable");
            }
        }
    });
    socket.on('servo10Enable', function (data) {
        if (data === true) {
            console.log("Servo 10 Motor Enable");
            socket.on('Servo10PosRequired', function (data) {
                socket.emit('packet10', data);
                servoPosReq = data;
                servoToMove = 10;
                console.log('Servo 10 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 10 Motor Disable");
            }
        }
    });
    socket.on('servo11Enable', function (data) {
        if (data === true) {
            console.log("Servo 11 Motor Enable");
            socket.on('Servo11PosRequired', function (data) {
                socket.emit('packet11', data);
                servoPosReq = data;
                servoToMove = 11;
                console.log('Servo 11 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 11 Motor Disable");
            }
        }
    });
    socket.on('servo12Enable', function (data) {
        if (data === true) {
            console.log("Servo 12 Motor Enable");
            socket.on('Servo12PosRequired', function (data) {
                socket.emit('packet12', data);
                servoPosReq = data;
                servoToMove = 12;
                console.log('Servo 12 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 12 Motor Disable");
            }
        }
    });
    socket.on('servo13Enable', function (data) {
        if (data === true) {
            console.log("Servo 13 Motor Enable");
            socket.on('Servo13PosRequired', function (data) {
                socket.emit('packet13', data);
                servoPosReq = data;
                servoToMove = 13;
                console.log('Servo 13 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 13 Motor Disable");
            }
        }
    });
    socket.on('servo14Enable', function (data) {
        if (data === true) {
            console.log("Servo 14 Motor Enable");
            socket.on('Servo14PosRequired', function (data) {
                socket.emit('packet14', data);
                servoPosReq = data;
                servoToMove = 14;
                console.log('Servo 14 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 14 Motor Disable");
            }
        }
    });
    socket.on('servo15Enable', function (data) {
        if (data === true) {
            console.log("Servo 15 Motor Enable");
            socket.on('Servo15PosRequired', function (data) {
                socket.emit('packet15', data);
                servoPosReq = data;
                servoToMove = 15;
                console.log('Servo 15 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 15 Motor Disable");
            }
        }
    });
 
    socket.on('servo16Enable', function (data) {
        if (data === true) {
            console.log("Servo 16 Motor Enable");
            socket.on('Servo16PosRequired', function (data) {
                socket.emit('packet16', data);
                servoPosReq = data;
                servoToMove = 16;
                console.log('Servo 16 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 16 Motor Disable");
            }
        }
    });
    
    socket.on('servo17Enable', function (data) {
        if (data === true) {
            console.log("Servo 17 Motor Enable");
            socket.on('Servo17PosRequired', function (data) {
                socket.emit('packet17', data);
                servoPosReq = data;
                servoToMove = 17;
                console.log('Servo 17 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 17 Motor Disable");
            }
        }
    });
   
    socket.on('servo18Enable', function (data) {
        if (data === true) {
            console.log("Servo 18 Motor Enable");
            socket.on('Servo18PosRequired', function (data) {
                socket.emit('packet18', data);
                servoPosReq = data;
                servoToMove = 18;
                console.log('Servo 18 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 18 Motor Disable");
            }
        }
    });
    socket.on('servo19Enable', function (data) {
        if (data === true) {
            console.log("Servo 19 Motor Enable");
            socket.on('Servo19PosRequired', function (data) {
                socket.emit('packet19', data);
                servoPosReq = data;
                servoToMove = 19;
                console.log('Servo 19 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 19 Motor Disable");
            }
        }
    });
    socket.on('servo20Enable', function (data) {
        if (data === true) {
            console.log("Servo 20 Motor Enable");
            socket.on('Servo20PosRequired', function (data) {
                socket.emit('packet20', data);
                servoPosReq = data;
                servoToMove = 20;
                console.log('Servo 20 Position Required:' + ' ' + servoPosReq);
            });
        } else {
            if (data === false) {
                console.log("Servo 20 Motor Disable");
            }
        }
    });
});

http.listen(3000, function () {
    console.log(`Listening on ${serverPort} `);
});