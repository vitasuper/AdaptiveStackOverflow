const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

/*
  Called at signup form to sign up a new user
*/
router.post('/signup', (req, res) => {
  console.log('backend/routers/userRouter.js - user signup');

  const { username, password } = req.body;

  /*
    Add validation to see the username/password from signup form is valid or not
  */
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('backend/routers/userRouter.js - User.js post error: ', err);
    } else if (user) {
      res.json({
        error: `Sorry, there's already a user with the username: ${username}`,
      })
    } else {
      const newUser = new User({
        username: username,
        password: password,
      });
      
      // Save to the database and pass the savedUser JSON data to signup page
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      })
    }
  })
});

/*
  Called at login form to log in and authenticated by Passport
  Good reference: http://toon.io/understanding-passportjs-authentication-flow/
*/
router.post(
  '/login',
  function (req, res, next) {
    console.log('backend/routers/userRouter.js - login, req.body: ');
    console.log(req.body);
    next();
  },
  passport.authenticate('local'), // this line will execute the code in the local strategy. Passport can get the UserSchema object
  (req, res) => {
    console.log('backend/routers/userRouter.js - logged in', req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
)

/*
  Check if the user is logged in

  1. The browser sends our request along with a cookie that has our unique session id.
  2. On server.js -> app.use(session(...)) Express notices that this id already has a session.
  3. app.use(passport.initialize()) loads `req.session.passport.user`, and if it is defined, that means this session is authenticated.
  4. app.use(passport.session()) calls passport.deserializeUser and assigns the user object from the database as `req.user`. Otherwise, req.user is undefined.
  5. In router/userRouter.js at the GET request, if req.user is defined, it means the user is logged in and this session is authenticated.
  6. We send the data back to the client side and update the state of App.js with the user info.
*/
router.get('/', (req, res, next) => {
  console.log('backend/routers/userRouter.js - current user: ');
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

/*
  `req.logout` clears the session and req.user.
*/
router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
})

module.exports = router;
