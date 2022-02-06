const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//mongoose.connect('mongodb+srv://admin-robert:AdminPass@cluster0.jisc7.mongodb.net/gamelistDB');
mongoose.connect('mongodb+srv://admin-robert:AdminPass@cluster0.jisc7.mongodb.net/gamelistDB?retryWrites=true&w=majority');

const gameListSchema = new mongoose.Schema ({
  name: String,
  platform: String,
  releaseDate: String
});

const Roope = mongoose.model('Roope', gameListSchema);
const Laura = mongoose.model('Laura', gameListSchema);

app.get('/', function(req, res) {
  var modelRoope = mongoose.model('Roope');
  var modelLaura = mongoose.model('Laura');

  modelRoope.find({}, function (err, roopeGames) {
    modelLaura.find({}, function (err, lauraGames) {
      res.render('gamelist', {roopeGameList: roopeGames, lauraGameList: lauraGames
      });
    });
  });
});

app.get('/deleteGame', function(req, res) {
  var modelRoope = mongoose.model('Roope');
  var modelLaura = mongoose.model('Laura');

  modelRoope.find({}, function (err, roopeGames) {
    modelLaura.find({}, function (err, lauraGames) {
      res.render('deleteGame', {roopeGameList: roopeGames, lauraGameList: lauraGames
      });
    });
  });
});

app.post('/', function(req, res) {
  user = req.body.user;
  gameName = req.body.gameName;
  gamePlatform = req.body.platform;
  gameReleaseDate = req.body.releaseDate;

  if (user === 'roope' && user != 'laura' && gameReleaseDate.length > 0) {
    Roope.create({name: gameName, platform: gamePlatform, releaseDate: gameReleaseDate});
  } else if (user === 'roope' && user != 'laura' && gameReleaseDate.length === 0) {
    Roope.create({name: gameName, platform: gamePlatform, releaseDate: 'TBA'});
  }

  if (user === 'laura' && user != 'roope' && gameReleaseDate.length > 0) {
    Laura.create({name: gameName, platform: gamePlatform, releaseDate: gameReleaseDate});
  } else if (user === 'laura' && user != 'roope' && gameReleaseDate.length === 0) {
    Laura.create({name: gameName, platform: gamePlatform, releaseDate: 'TBA'});
  }

  res.redirect('/');
 });

 app.post('/deleteGame', function(req, res) {
   user = req.body.userDelete;
   gameLaura = req.body.selectLaura;
   gameRoope = req.body.selectRoope;

   if (user === 'roopeDelete') {
     Roope.deleteOne({name: gameRoope}, function(err) {
       if (err) {
         console.log(err);
       }
     });
   } else if (user === 'lauraDelete') {
     Laura.deleteOne({name: gameLaura}, function(err) {
       if (err) {
         console.log(err);
       }
     });
   }

   res.redirect('/deleteGame');
  });

app.listen(process.env.PORT || 3000, function() {
  console.log('Server has started successfully');
});
