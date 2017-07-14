const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {type: String, required: true},
  stats: {
    day: {type: Date, required: true, default: Date.now},
    units: {type: String, required: true},
    number: {type: Number, required: true}
  },
  user: {type: mongoose.Schema.ObjectId}
});


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
