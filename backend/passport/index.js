const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/models/user');

/*
  In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. 
  If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

  Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. 
  In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
  Reference: http://www.passportjs.org/docs/authenticate/
*/

/*
  In this case, only the user ID is serialized to the session, keeping the amount of data stored within the session small. 
  When subsequent requests are received, this ID is used to find the user, which will be restored to `req.user`.  

  Will be called on login, saves the id to session req.session.passport.user = {id:'...'}
*/
passport.serializeUser((user, done) => {
  console.log('backend/passport/index.js - serializeUser called, user: ');
  console.log(user);
  
  done(null, { _id: user._id});
});

/*
  user object attaches to the request as req.user
*/
passport.deserializeUser((id, done) => {
  console.log('backend/passport/index.js - deserialize called');
  User.findOne(
    { _id: id }, // conditions
    (err, user) => { // callback
      console.log('backend/passport/index.js - deserialize user, user: ');
      console.log(user);
      done(null, user);
    }
  );
});

/*
  Create strategy and set strategy for passport.
  Passport uses strategies to authenticate requests.
*/
const localStrategy = new LocalStrategy(
  {
    usernameField: 'username' // option, default
  },
  (username, password, done) => { // verify function
    User.findOne(
      { username: username }, // condition
      (err, user) => { // callback
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        if (!user.checkPassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }

        // success
        return done(null, user);
    });
  }
);

passport.use(localStrategy);
