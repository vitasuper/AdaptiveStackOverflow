/*
  Connect to Mongo database hosted on mLab.
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://test:test123@ds149252.mlab.com:49252/adaptive-stackoverflow';

mongoose.connect(uri)
  .then(
    () => {
      // Ready to use. The `mongoose.connect()` promise resolves to undefined.
      console.log('backend/database/models/index.js - Connected to MongoDB');
    },
    (err) => {
      // Handle initial connection error.
      console.log('backend/database/models/index.js - error connecting to MongoDB');
      console.log(err);
    }
  );

module.exports = mongoose.connection;
