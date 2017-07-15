const mongoose = require('mongoose');
const Activity = require('./models/activity');

let activity1 = new Activity({
  name: 'Drink water',
  stats: {
    day: new Date,
    units: "ounces",
    number: 85
  }
});

let activity2 = new Activity({
  name: 'Running',
  stats: {
    day: new Date,
    units: "miles",
    number: 3
  }
});

activity1.save();
activity2.save();
