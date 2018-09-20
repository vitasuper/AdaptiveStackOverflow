const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise

/*
  Define UserProfileSchema
*/
const UserProfileSchema = new Schema({
  username: String,
  lastLoginTime: Date,
  // ...
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
