const express = require('express');
const router = express.Router();
const UserProfile = require('../database/models/userProfile');

/*
  Get a specific user profile.
*/
router.post('/:username', (req, res) => {
  let currentUsername = req.params.username;
  UserProfile.findOne({ username: currentUsername}, (err, userprofile) => {
    if (err) {
      console.log('ERR - backend/routers/userProfileRouter.js - post error: ', err);
    } else if (userprofile) {  // user profile exist
      let oldUserprofile = JSON.parse(JSON.stringify(userprofile));
      userprofile.set({lastLoginTime: new Date()});
      userprofile.save((err, updatedUserprofile) => {
        if (err) return res.json(err);
      });
      res.json(oldUserprofile);
    } else { // user profile doesn't exist
      const newUserprofile = new UserProfile({
        username: currentUsername,
        lastLoginTime: new Date(),
      });

      newUserprofile.save((err, updatedUserprofile) => {
        if (err) return res.json(err);
        res.json(updatedUserprofile);
      });
    }
  });
});

module.exports = router;
