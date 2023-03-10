const express = require('express');
const path = require('path');
var fs = require("fs");

//comment dit uit voor geen package bullshit
//ar Gpio = require('onoff').Gpio; 
//var sensor = new Gpio(17, 'in', 'both'); 



const app = express();
const port = process.env.PORT || 8080;
let c = 0;

// Static Files
app.use(express.static('public'));


function unexportOnClose() { 
  sensor.unexport(); 
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});



app.get('/windspeed', function(req, res) {
  res.sendFile(path.join(__dirname, '/windspeed.html'));
});

app.get('/winddirection', function(req, res) {
  res.sendFile(path.join(__dirname, '/winddirection.html'));
});

let seconds = 0

setInterval(function () {
  seconds = seconds + 1;
  
}, 1000);

//maak json object aan op /data
app.get('/sensordata',(req,res) => {
  //comment dit uit voor geen sensor package bullshit
  // sensor.watch(function (err, value) { 
	// 	if (err) { //if an error
	// 	  console.error('There was an error', err); 
	// 	return;
	// 	}
	// 	console.log(value);
	// 	c = value;
	//   });

    let x1 = Math.floor((Math.random() * 30) + 1);
    let x2 = Math.floor((Math.random() * 360) + 1);
    let x3 = Math.floor((Math.random() * 100) + 1);
    let x4 = Math.floor((Math.random() * 100) + 1);
    let x5 = Math.floor((Math.random() * 100) + 1);
  let sensordata = {

      "sensordata" : {
        test:"0",
        avgwindspeed:x1,
        avgwinddirection:x2,
        runtime:seconds,
        sensor1:x3,
        sensor2:x4,
        sensor3:x5,
        sensordata: c
      }
  }

  res.type('json').send(sensordata)

})




app.listen(port);
console.log('Server started at http://localhost:' + port);