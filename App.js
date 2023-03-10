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
app.use(express.json());

let sensorData = {
  avgwindspeed: 0,
  avgwinddirection: 0,
  runtime: 0,
  sensor1: 0,
  sensor2: 0,
  sensor3: 0,
  sensordata: 0
};


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


  res.type('json').send(sensordata)

})


app.post('/sensordata/s1', function(req, res) {
  sensorData["sensor1"] = req.body;
  console.log('Sensor data updated:', sensorData);
  res.status(200).send('Sensor data updated');
});

app.post('/sensordata/s2', function(req, res) {
  sensorData["sensor2"] = req.body;
  console.log('Sensor data updated:', sensorData);
  res.status(200).send('Sensor data updated');
});

app.post('/sensordata/s3', function(req, res) {
  sensorData["sensor3"] = req.body;
  console.log('Sensor data updated:', sensorData);
  res.status(200).send('Sensor data updated');
});



app.listen(port);
console.log('Server started at http://localhost:' + port);