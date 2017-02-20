'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  zip: String,
  interest: String,
  friends: [],
  itineraries: [],
  favorites: [],
});

const stopSchema = new mongoose.Schema({
  placeName: String,
  location: String,
  description: String,
  stopNumber: Number,
  iconLink: String,
});

const itinerarySchema = new mongoose.Schema({
  title: String,
  author: String,
  authorLocation: String,
  authorZip: String,
  stops: [stopSchema],
  created: { type: Date, default: Date.now },
});


const Itinerary = mongoose.model('Itinerary', itinerarySchema);
const User = mongoose.model('User', userSchema);

module.exports = { Itinerary, User };
