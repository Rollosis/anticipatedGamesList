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

const releasedGameSchema = new mongoose.Schema ({
  name: String,
  rating: String,
  review: String
});

const Roope = mongoose.model('Roope', gameListSchema);
const Laura = mongoose.model('Laura', gameListSchema);
const Release = mongoose.model('Release', releasedGameSchema);

app.get('/', function(req, res) {
  var modelRoope = mongoose.model('Roope');
  var modelLaura = mongoose.model('Laura');
  var modelReleased = mongoose.model('Release');
  const test = req.body.test;

  modelRoope.find({}, function (err, roopeGames) {
    modelLaura.find({}, function (err, lauraGames) {
      modelReleased.find({}, function(err, releasedGames) {
      res.render('gamelist', {roopeGameList: roopeGames, lauraGameList: lauraGames, releasedGameList: releasedGames});
    });
  }).sort({releaseDate: 1});
}).sort({releaseDate: 1});

});

// app.get('/updateGame', function(req, res) {
//   var modelRoope = mongoose.model('Roope');
//   var modelLaura = mongoose.model('Laura');
//
//   modelRoope.find({}, function (err, roopeGames) {
//     modelLaura.find({}, function (err, lauraGames) {
//       res.render('updateGame', {roopeGameList: roopeGames, lauraGameList: lauraGames
//       });
//     });
//   });
// });

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

// DELETE GAME FROM LAURAS TABLE
 app.post('/delete', function(req, res) {
   const clickedItemId = req.body.deleteButton;

   Laura.findByIdAndRemove(clickedItemId, function(err){
     if (!err) {
       console.log('Deleted');
     }
   });

   res.redirect('/');
 });

// TRANSFER GAME FROM LAURAS HYPED GAMES TO RELEASED GAMES TABLE
 app.post('/transferLaura', function(req, res) {
   const clickedItem = req.body.transferButton;

   Release.create({name: gameName, rating: 'NO RATING', review: 'NO REVIEW'});

   Laura.findOneAndDelete({name: clickedItem}, function(err){
     if (!err) {
       console.log('Deleted');
     }
   });

   res.redirect('/');
 });

// DELETE GAME FROM ROBERTS TABLE
 app.post('/deleted', function(req, res) {
   const clickedItemId = req.body.deletedButton;

   Roope.findByIdAndRemove(clickedItemId, function(err){
     if (!err) {
       console.log('Deleted');
     }
   });

   res.redirect('/');
 });

// TRANSFER GAME FROM ROBERTS HYPED GAMES TO RELEASED GAMES TABLE
 app.post('/transferRoope', function(req, res) {
   const clickedItem = req.body.transferButton;

   Release.create({name: clickedItem, rating: 'NO RATING', review: 'NO REVIEW'});

   Release.findOneAndUpdate(clickedItem, {rating: 'Pending...'}, function(err) {
     if (err) {
       console.log('Something went wrong');
     }
   });

   Roope.findOneAndDelete({name: clickedItem}, function(err){
     if (!err) {
       console.log('Deleted');
     }
   });

   res.redirect('/');
 });

 app.post('/gameReview', function(req, res) {
   const game = req.body.releasedGameName;
   const rating = req.body.rating;
   const review = req.body.review;

   const updateItem = {name: game}

   Release.find({name: game}, function(err) {
     if (!err || document.getElementById('review').value != "") {
       Release.updateMany(updateItem, {rating: rating, review: review}, function(err, res) {
         if (err) {
           console.log(err)
         }
       });
     } else {
       console.log(err);
     }
   });

   res.redirect('/');
  });

  app.listen(process.env.PORT || 3000, function() {
    console.log('Server has started successfully');
  });
