const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://admin-robert:AdminPass@cluster0.jisc7.mongodb.net/gamelistDB');
//mongoose.connect('mongodb+srv://admin-robert:AdminPass@cluster0.jisc7.mongodb.net/gamelistDB?retryWrites=true&w=majority');
//mongoose.connect('mongodb://localhost:27017/gamelistDB');

const gameListSchema = new mongoose.Schema ({
  name: String,
  platform: String,
  releaseDate: String
});

const releasedGameSchema = new mongoose.Schema ({
  name: String,
  rating: String,
  review: String
});

const Roope = mongoose.model('Roope', gameListSchema);
const Laura = mongoose.model('Laura', gameListSchema);
const Release = mongoose.model('Release', releasedGameSchema);
const RobertReleasedGames = mongoose.model('RobertReleasedGames', releasedGameSchema);
const LauraReleasedGames = mongoose.model('LauraReleasedGames', releasedGameSchema);

app.get('/', function(req, res) {
  var modelRoope = mongoose.model('Roope');
  var modelLaura = mongoose.model('Laura');
  //var modelReleased = mongoose.model('Release');
  var modelRobertReleasedGames = mongoose.model('RobertReleasedGames');
  var modelLauraReleasedGames = mongoose.model('LauraReleasedGames');
  const test = req.body.test;

  modelRoope.find({}, function (err, roopeGames) {
    modelLaura.find({}, function (err, lauraGames) {
      modelRobertReleasedGames.find({}, function(err, robertReleasedGames) {
        modelLauraReleasedGames.find({}, function(err, lauraReleasedGames) {
          res.render('gamelist', {roopeGameList: roopeGames, lauraGameList: lauraGames, robertReleasedGameList: robertReleasedGames, lauraReleasedGameList: lauraReleasedGames});
        });
      }).sort({releaseDate: 1});
    }).sort({releaseDate: 1});
  }).sort({releaseDate: 1});

});

////////////////////////////////// ROBERT START /////////////////////////////////////////////////////////////////////////////////

// ROBERT'S PAGE
app.get('/robert', function(req, res) {
  var modelRoope = mongoose.model('Roope');
    var modelRobertReleasedGames = mongoose.model('RobertReleasedGames');
  const test = req.body.test;

  modelRoope.find({}, function (err, roopeGames) {
    modelRobertReleasedGames.find({}, function(err, robertReleasedGames) {
      res.render('gamelist_robert', {roopeGameList: roopeGames, robertReleasedGameList: robertReleasedGames});
    });
  }).sort({releaseDate: 1});
});

// ADD A NEW GAME
app.post('/robertAdd', function(req, res) {
  //user = req.body.user;
  gameName = req.body.gameName;
  gamePlatform = req.body.platform;
  gameReleaseDate = req.body.releaseDate;

  if (gameReleaseDate.length > 0) {
    Roope.create({name: gameName, platform: gamePlatform, releaseDate: gameReleaseDate});
  } else if (gameReleaseDate.length === 0) {
    Roope.create({name: gameName, platform: gamePlatform, releaseDate: 'TBA'});
  }

  res.redirect('/robert');
});

// DELETE A GAME
app.post('/robertDelete', function(req, res) {
  const clickedItemId = req.body.deletedButton;
   Roope.findByIdAndRemove(clickedItemId, function(err){
     if (!err) {
       console.log('Deleted');
     }
   });

   res.redirect('/robert');
 });

 // UPDATE GAME RELEASE DATE
 app.post('/robertUpdate', function(req, res) {
   const id = req.body.platform;
   const newReleaseDate = req.body.updatedReleaseDate;

   Roope.findByIdAndUpdate(id, {releaseDate: newReleaseDate}, function(err) {
     if (!err) {
       console.log(id);
     } else {
       console.log('ERROR');
     }
   });

   res.redirect('/robert');
 });

 // TRANSFER GAME TO RELEASED GAMES TABLE
 app.post('/robertTransfer', function(req, res) {
   const clickedItem = req.body.transferButton;

   RobertReleasedGames.create({name: clickedItem, rating: '-', review: '-'});

   Roope.findOneAndDelete({name: clickedItem}, function(err){
     if (!err) {
       console.log('Deleted');
     }
   });

   res.redirect('/robert');
 });

 // REVIEW GAME
 app.post('/robertReview', function(req, res) {
   const game = req.body.releasedGameName;
   const rating = req.body.rating;
   const review = req.body.review;
   const updateItem = {name: game}

   RobertReleasedGames.find({name: game}, function(err) {
     if (!err || document.getElementById('review').value != "") {
       RobertReleasedGames.updateMany(updateItem, {rating: rating, review: review}, function(err, res) {
         if (err) {
           console.log(err)
         }
       });
     } else {
       console.log(err);
     }
   });

   res.redirect('/robert');
 });

////////////////////////////////// ROBERT END /////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// LAURA START /////////////////////////////////////////////////////////////////////////////////

// LAURA'S PAGE
app.get('/laura', function(req, res) {
  var modelLaura = mongoose.model('Laura');
  var modelLauraReleasedGames = mongoose.model('LauraReleasedGames');
  const test = req.body.test;

  modelLaura.find({}, function (err, lauraGames) {
    modelLauraReleasedGames.find({}, function(err, lauraReleasedGames) {
      res.render('gamelist_laura', {lauraGameList: lauraGames, lauraReleasedGameList: lauraReleasedGames});
    });
  }).sort({releaseDate: 1});
});

// ADD A NEW GAME
app.post('/lauraAdd', function(req, res) {
  //user = req.body.user;
  gameName = req.body.gameName;
  gamePlatform = req.body.platform;
  gameReleaseDate = req.body.releaseDate;

  if (gameReleaseDate.length > 0) {
    Laura.create({name: gameName, platform: gamePlatform, releaseDate: gameReleaseDate});
  } else if (gameReleaseDate.length === 0) {
    Laura.create({name: gameName, platform: gamePlatform, releaseDate: 'TBA'});
  }

  res.redirect('/laura');
});

// DELETE A GAME
app.post('/lauraDelete', function(req, res) {
  const clickedItemId = req.body.deleteButton;

  Laura.findByIdAndRemove(clickedItemId, function(err){
    if (!err) {
      console.log('Deleted');
    }
  });

  res.redirect('/laura');
});

// UPDATES GAME RELEASE DATE
app.post('/lauraUpdate', function(req, res) {
  const id = req.body.platform;
  const newReleaseDate = req.body.updatedReleaseDate;

  Laura.findByIdAndUpdate(id, {releaseDate: newReleaseDate}, function(err) {
    if (!err) {
      console.log(id);
    } else {
      console.log('ERROR');
    }
  });

  res.redirect('/laura');
});

// TRANSFER GAME TO RELEASED GAMES TABLE
app.post('/lauraTransfer', function(req, res) {
  const clickedItem = req.body.transferButton;

  LauraReleasedGames.create({name: clickedItem, rating: '-', review: '-'});
  Laura.findOneAndDelete({name: clickedItem}, function(err) {
    if (!err) {
      console.log('Deleted');
    }
  });

  res.redirect('/laura');
});

// REVIEW GAME
app.post('/lauraReview', function(req, res) {
  const game = req.body.releasedGameName;
  const rating = req.body.rating;
  const review = req.body.review;
  const updateItem = {name: game}

  LauraReleasedGames.find({name: game}, function(err) {
    if (!err || document.getElementById('review').value != "") {
      LauraReleasedGames.updateMany(updateItem, {rating: rating, review: review}, function(err, res) {
        if (err) {
          console.log(err)
        }
      });
    } else {
      console.log(err);
    }
  });

  res.redirect('/laura');
});

////////////////////////////////// LAURA END /////////////////////////////////////////////////////////////////////////////////

// app.get('/all-games', function(req, res) {
//   res.sendFile(__dirname + '/gamedatabase.html');
// });

// GAME INSERT ON GLOBAL PAGE (NOT USED ANYMORE)
// app.post('/', function(req, res) {
//   user = req.body.user;
//   gameName = req.body.gameName;
//   gamePlatform = req.body.platform;
//   gameReleaseDate = req.body.releaseDate;
//
//   if (user === 'roope' && user != 'laura' && gameReleaseDate.length > 0) {
//     Roope.create({name: gameName, platform: gamePlatform, releaseDate: gameReleaseDate});
//   } else if (user === 'roope' && user != 'laura' && gameReleaseDate.length === 0) {
//     Roope.create({name: gameName, platform: gamePlatform, releaseDate: 'TBA'});
//   }
//
//   if (user === 'laura' && user != 'roope' && gameReleaseDate.length > 0) {
//     Laura.create({name: gameName, platform: gamePlatform, releaseDate: gameReleaseDate});
//   } else if (user === 'laura' && user != 'roope' && gameReleaseDate.length === 0) {
//     Laura.create({name: gameName, platform: gamePlatform, releaseDate: 'TBA'});
//   }
//
//   res.redirect('/');
// });

// DO NOT DELTE
app.listen(process.env.PORT || 3000, function() {
  console.log('Server has started successfully');
});
