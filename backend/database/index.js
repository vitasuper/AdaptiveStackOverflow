/*
  Connect to Mongo database hosted on mLab.
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://test:test123@ds259802.mlab.com:59802/adaptive-stackoverflow-2';

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
