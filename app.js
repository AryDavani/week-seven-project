'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const User = require('./models/users.js');

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


router(app);

app.listen(3000);
