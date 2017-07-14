const mongoose = require('mongoose');
const User = require('./models/users');

let user1 = new User({
  username: 'ary',
  password: 'pass'
});

user1.save();
