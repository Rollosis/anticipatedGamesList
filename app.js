const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Laurans values
var newGameNameItems = [];
var newGamePlatformItems = [];
var newGameReleasedateItems = [];

// Roopes values
var newGameNameItemsR = [];
var newGamePlatformItemsR = [];
var newGameReleasedateItemsR = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  // var today = new Date();
  // var options = {
  //   weekday: 'long',
  //   day: 'numeric',
  //   month: 'long'
  // };
  // var day = today.toLocaleDateString('en-US', options);
  res.render('gamelist',
  {newGameNameItems: newGameNameItems, newGamePlatformItems: newGamePlatformItems, newGameReleasedateItems: newGameReleasedateItems, newGameNameItemsR: newGameNameItemsR, newGamePlatformItemsR: newGamePlatformItemsR, newGameReleasedateItemsR: newGameReleasedateItemsR});
});

app.post('/', function(req, res) {
  user = req.body.user;
  // Lauras inputs
  newGameName = req.body.gameName;
  newGamePlatform = req.body.platform;
  newGameReleaseDate = req.body.releaseDate;

if (user === 'laura') {
  // Push Lauras values
  newGameNameItems.push(newGameName);
  newGamePlatformItems.push(newGamePlatform);
  newGameReleasedateItems.push(newGameReleaseDate);
} else if (user === 'roope') {
  // Push Roopes values
  newGameNameItemsR.push(newGameName);
  newGamePlatformItemsR.push(newGameName);
  newGameReleasedateItemsR.push(newGameReleaseDate);
}

  res.redirect('/');
});

app.listen(3000, function() {
  console.log('Server running on port 3000');
});
