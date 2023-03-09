const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 8080;

// Static Files
app.use(express.static('public'));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/windspeed', function(req, res) {
  res.sendFile(path.join(__dirname, '/windspeed.html'));
});

app.get('/windsdirection', function(req, res) {
  res.sendFile(path.join(__dirname, '/windspeed.html'));
});

let seconds = 0

setInterval(function () {
  seconds = seconds + 1;
  
}, 1000);

//maak json object aan op /data
app.get('/data',(req,res) => {

    let x1 = Math.floor((Math.random() * 30) + 1);
    let x2 = Math.floor((Math.random() * 360) + 1);
    let x3 = Math.floor((Math.random() * 100) + 1);
    let x4 = Math.floor((Math.random() * 100) + 1);
    let x5 = Math.floor((Math.random() * 100) + 1);
  let responseData = {
      


      avgwindspeed:x1,
      avgwinddirection:x2,
      runtime:seconds,
      sensor1:x3,
      sensor2:x4,
      sensor3:x5
  }

  res.type('json').send(responseData)

})


app.listen(port);
console.log('Server started at http://localhost:' + port);