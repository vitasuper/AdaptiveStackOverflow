const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

/*
  Define UserEvent
*/
const UserEventSchema = new Schema({
  username: String,
  events: [{
    timeStamp: Date,
    eventType: String,
    extraInfo: String,
  }],
});

const UserEvent = mongoose.model('UserEvent', UserEventSchema);

module.exports = UserEvent;
