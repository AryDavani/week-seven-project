const mongoose = require('mongoose');
const User = require('./models/users');
mongoose.connect('mongodb://localhost:27017/statsdb');


let user1 = new User({
  username: 'ary',
  password: 'pass'
});

let user2 = new User({
  username: 'yeah',
  password: 'nah'
});

user1.save();
user2.save();
