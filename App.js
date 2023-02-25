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



//maak json object aan op /data
app.get('/data',(req,res) => {

    let x1 = Math.floor((Math.random() * 100) + 1);
    let x2 = Math.floor((Math.random() * 100) + 1);
    let x3 = Math.floor((Math.random() * 100) + 1);
  let responseData = {
        


      message1:x1,
      message2:x2,
      message3:x3
  }

  res.type('json').send(responseData)

})


app.listen(port);
console.log('Server started at http://localhost:' + port);