const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//app.use(express.static('public'));
app.use(express.static('public'));

app.get('/', function(req, res) {
  var today = new Date();

  res.sendFile(__dirname + '/gamepage.html');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port 3000');
});
