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

// Route requires
const user = require('./routes/user');

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
  session({
    secret: 'vitasuper', // pick a random string to make the hash that is generated secure
    resave: false, // required
    saveUninitialized: false // required
  })
);

app.use((req, res, next) => {
  console.log('req.session', req.session);
  next();
})

// Routing
app.use('/user', user); // use rules inside `user` as routing rules for url `/user`

// Starting server
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
