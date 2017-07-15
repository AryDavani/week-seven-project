'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
const parseurl = require('parseurl');
const BasicStrategy = require("passport-http").BasicStrategy;
const Activities = require('./models/activity');
const User = require('./models/users');

const app = express();

app.use(bodyParser.json());

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/statsdb');

app.use(passport.initialize());

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username: username, password: password}).then(function(user){
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  }
));

app.get('/api/activites', passport.authenticate('basic', {session: false}), (req, res) => {

  Activities.find().then((results) => {
    res.json(results);
  });
}); // Show a list of all activities I am tracking, and links to their individual pages.



app.post('/api/activites', passport.authenticate('basic', {session: false}), (req, res) => {

  const activity = new Activity({
    name: req.body.name,
    stats: {
      units: req.body.units,
      number: req.body.number
    }
  }).save();
  res.json({});
}); // Create a new activity for me to track.



app.get('/api/activites/{id}', passport.authenticate('basic', {session: false}), (req, res) => {
  let id = req.params.id;

  Activities.findById(id).then((results) => {
    res.json(results);
  });
}); // Show information about one activity I am tracking, and give me the data I have recorded for that activity.



app.put('/api/activites/{id}', passport.authenticate('basic', {session: false}), (req, res) => {
  let id = req.params.id;
  let name = req.body.name;

  Activities.findById(id).then((result) => {
    result.name = name;
    result.save();
    res.json(result);
  });
}); // Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.



app.delete('/api/activites/{id}', passport.authenticate('basic', {session: false}), (req, res) => {
  let id = req.params.id;

  Activities.remove({_id: id}).then(() => {
    res.json({});
  });
}); // Delete one activity I am tracking. This should remove tracked data for that activity as well.



app.post('/api/activites/{id}/stats', passport.authenticate('basic', {session: false}), (req, res) => {
  let id = req.params.id;
  let units = req.body.units;
  let number = req.body.number;
  let day = req.body.day;

  Activities.findById(id).then((result) => {
    result.stats.push({
      units: units,
      number: number,
      day: day
    });
    result.save();
    res.json(result);
  });
}); // Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.



app.delete('/api/activites/{id}', passport.authenticate('basic', {session: false}), (req, res) => {
  let id = req.params.id;
  let statsId = req.body.statsId;

  Activities.update(
    { _id: id },
    { $pull: {stats: { _id: statsId }}}
  ).then((result) => {
    res.json(result);
  });
}); // 	Remove tracked data for a day.


app.listen(3000, () => {
  console.log("Listening...");
});
