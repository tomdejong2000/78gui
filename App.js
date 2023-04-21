const express = require('express');
const path = require('path');
var fs = require("fs");






const app = express();
const port = process.env.PORT || 8080;
let c = 0;
let key = "bradlyIsDom";

// Static Files
app.use(express.static('public'));
app.use(express.json());

let sensorData = {
  avgwindspeed: 0,
  avgwinddirection: 0,
  runtime: 0,
  sensor1: 0,
  sensor1Time: 0,
  sensor2: 0,
  sensor3: 0,
  sensordata: 0
};




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


  res.type('json').send(sensorData)

})
const apiKeyCheck = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (apiKey !== key) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
};

app.post('/sensordata/:sensorId', apiKeyCheck, function(req, res) {
  const sensorId = req.params.sensorId;
  sensorData[sensorId] = req.body["value"];
  sensorData[sensorId + "Time"] = req.body["dataTime"];
  res.status(200).send(`Sensor:  ${sensorId} data updated`);
});




app.listen(port);
console.log('Server started at http://localhost:' + port);