let servoToRd = 1;
let servoPosReq = 0;
let comPort = 'COM8'

function getData(){
        /* Generate a python process using nodejs child_process module */
        const spawn = require('child_process').spawn;
        const py_process = spawn('python', ["./lx16a.py", arg1 = servoToRd, arg2 = servoPosReq, arg3 = comPort]);

        /* Define what to do on everytime node application receives data from py_process */
        py_process.stdout.on('data', function(data){
        console.log('Reading servo data')
        var logData = JSON.parse(data)
        let showData = logData.split(" ")
        console.log(`ID: ${showData[0]} Temp: ${showData[1]}C Pos: ${showData[2]} Voltage: ${showData[3]} v `)
        });
    }

    setInterval(function() {
    if (servoToRd >= 20) {
        servoToRd = 1
    }
    console.log(`About to read ID ${servoToRd}`)
    getData() 
    console.log(`Read ID ${servoToRd} complete`)
    servoToRd++
}, 1000)
   

