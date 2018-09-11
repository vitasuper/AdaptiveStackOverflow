/*
  Main file of our backend server
*/

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const app = express();
const PORT = 3001;

const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session)

const passport = require('./passport');

// Router requires
const userRouter = require('./routers/userRouter');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
  Sessions setup
  The first time a browser makes a request to our server, express session will do the following things:
  1. generates a unique session id
  2. saves that session id in a session cookie and passes this back to the browser.
  3. creates an empty session object, as req.session.
  4. saves the session object to the database.

  If the same browser makes another request, the browser sends the cookie that contains our session id.
  Express session knows that browser has sent requests before.
*/
app.use(
  session({ // express-session
    secret: 'vitasuper', // pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }), // express-session can’t handle more than one user at a time, so connect-mongo stores session info in our database
    resave: false, // required
    saveUninitialized: false // required
  })
);

/*
  Passport setup (to work with sessions) - to authenticate requests
  These lines of code run on every request. They call functions in the passport/index.js called serializeUser and deserializeUser. 
  1. serializeUser stores the user id to req.session.passport.user = {id:'...'}.
  2. deserializeUser will check to see if this user is saved in the database, and if it is found it assigns it to the request as req.user = {user object}.
*/
app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser


// Routing
app.use('/user', userRouter); // use rules inside `user` as routing rules for url `/user`

// Starting server
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
