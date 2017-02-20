'use strict';

const express = require('express');
const path = require('path');
const request = require('request');
const mongoose = require('mongoose');
const cors = require('cors');
const Models = require('./database/models');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './node_modules/')));
app.use(express.static(path.join(__dirname, './client/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// ***DATABASE SETUP***
// Using a Hosted MongoDB @ https://mlab.com/ account.
// You can use login info below to access mlab.com portal to add additional user accounts.
mongoose.connect('mongodb://nmarentes:beekeepers17@ds049211.mlab.com:49211/nativeapp');
// mongoose.connect('mongodb://dhanimay:http99@ds023932.mlab.com:23932/wheninrome');
const db = mongoose.connection.once('open', () => {
  console.log('Connected to mongodb with mongoose');
});
db.on('error', console.error.bind(console, 'connection error: '));
// ***END OF DATABASE SETUP ***
// Google Maps API Key: AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig
// GET request to /itins serves up ALL itins in DB. You can also see at http://localhost:3000/itins
app.get('/itins', (req, res) => {
  Models.Itinerary.find({}, (err, itins) => {
    if (err) return console.error(err);
    res.json(itins);
  });
});

app.post('/create', (req, res) => {
  Models.Itinerary.create(req.body, (err, created) => {
    if (err) return console.error(err);
    res.send(req.body);
  });
});

app.post('/user/create', (req, res) => {
  Models.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return console.error(err);
    if (user) return res.json('User exists.');

    Models.User.create(req.body, (err, created) => {
      if (err) return console.error(err);
      if (created) return res.json(created);
      res.json('Account could not be created.');
    });
  });
});

app.post('/user/valid', (req, res) => {
  Models.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return console.error(err);
    if (!user) return res.json('Something is entered incorrectly!!!!!!!');
    if (user.password === req.body.password) return res.json(user);
    res.json('Something is entered incorrectly!');
  });
});

// FIXME does not search if a user already exists before adding
app.post('/findFriend', (req, res) => {
  Models.User.findOne({ username: req.body.friend }, (err, user) => {
    if (err) return console.error(err);
    if (!user) return res.json(false);
    res.json({ username: user.username, zip: user.zip });
  });
});

app.post('/addFriend', (req, res) => {
  Models.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return console.error(err);
    user.friends.push(req.body.friend.username);
    Models.User.update({ username: user.username }, { friends: user.friends }, (err, affected) => {
      if (err) return console.error(err);
      return res.json(true);
    });
  });
});

app.post('/getFriends', (req, res) => {
  Models.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return console.error(err);

    Models.User.find({ username: { $in: user.friends } }, (err, users) => {
      if (err) return console.error(err);
      const mappedUsers = users.map((user) => {
        return {
          username: user.username,
          zip: user.zip,
        };
      });
      return res.json(mappedUsers);
    });
  });
});


app.post('/getItineraries', (req, res) => {
  if (req.body.type === 'city') {
    Models.Itinerary.find({ authorLocation: req.body.name }, (err, itins) => {
      if (err) return console.error(err);
      return res.json(itins);
    });
  } else {
    Models.User.findOne({ username: req.body.name }, (err, user) => {
      if (err) return console.error(err);
      if (req.body.type === 'favorites') {
        Models.Itinerary.find({ title: { $in: user.favorites } }, (err, itins) => {
          if (err) return console.error(err);
          return res.json(itins);
        });
      } else {
        // finding current user's itineraries
        Models.Itinerary.find({ title: { $in: user.itineraries } }, (err, itins) => {
          if (err) return console.error(err);
          return res.json(itins);
        });
      }
    });
  }
});

app.get('/getItinerary', (req, res) => {
  Models.Itinerary.findOne({ title: req.query.title }, (err, itin) => {
    if (err) return console.log(err);
    return res.json(itin);
  });
});


app.get('/searchLocation', (req, res) => {
  request({
    uri: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + req.query.query + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig',
  }).pipe(res);
});


app.get('/curLocation', (req, res) => {
  request({
    uri: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.query.latitude + ',' + req.query.longitude + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig',
  }).pipe(res);
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
