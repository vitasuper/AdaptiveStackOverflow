const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
// const bcrypt = require('bcrypt-nodejs');
mongoose.promise = Promise

/*
  Define userSchema
*/
const UserSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false }
});

/*
  Define schema methods
  `bcrypt` is used for compare the password and hashing the password
*/
UserSchema.methods = {
	checkPassword: function(inputPassword) {  // NOTE: do not pass arrow function since you need to use `this`: https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
		return bcrypt.compareSync(inputPassword, this.password);
	},
  hashPassword: function(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

/*
  Define hooks for pre-saving (pre processing before saving to database)
  Before mongoose saves a document in the database, we want to hash the password, 
  using the hashPassword method defined just above this in UserSchema.methods. 
  This is serial middleware, so the next() function is needed to move on to the next middleware method.
*/
UserSchema.pre('save', function(next) { // NOTE: do not pass arrow function: https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
  if (!this.password) {
    console.log('backend/database/models/user.js - No password provided');
    next();
  } else {
    console.log('backend/database/models/user.js - hashPassword in pre save');

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
