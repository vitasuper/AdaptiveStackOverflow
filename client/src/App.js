import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { myAuth, PrivateRoute } from './utils/privateRoute';

// Components
import Signup from './components/signUp';
import LoginForm from './components/login';
import Navbar from './components/navbar';
import Home from './components/home';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username: '',
      lastLoginTime: '',
    };
    
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getUsername = this.getUsername.bind(this);

    this.getUser();
  }

  getUser() {
    const self = this;
    axios.get('/user/')
      .then((response) => {
        console.log('client/App.js - Get user response: ');
        console.log(response.data);
        if (response.data.user) {
          myAuth.authenticate();
          console.log('client/App.js - Get User: There is a user saved in the server session: ');

          self.setState({
            loggedIn: true,
            username: response.data.user.username,
          });

          /*
             Get user profile once the website is opened
             (only call once before the website is closed)
             Set lastLoginTime of this.state so that the App component will re-render
          */
          axios
            .post('/userprofile/' + response.data.user.username)
            .then((innerresponse) => {
              console.log('client/App.js - get userprofile and the response is: ');
              console.log(innerresponse);
              self.setState({
                lastLoginTime: innerresponse.data.lastLoginTime,
              });
            });
        } else {
          console.log('client/App.js - Get user: no user');
          this.setState({
            loggedIn: false,
            username: null
          });
        }
      });
  }

  updateUser(userObject) {
    console.log('client/App.js - update user by userObject');
    console.log(userObject);
    this.setState(userObject);
  }

  getUsername() {
    return this.state.username;
  }
  /*
    Set up React Router to direct which component to render
  */
  render() {
    console.log('client/App.js - App render')

    return (
      <div className="App">
        <Navbar
          updateUser={this.updateUser}
          lastLoginTime={this.state.lastLoginTime}
          username={this.state.username}
          loggedIn={this.state.loggedIn}
        />

        {/* Routes to different components */}
        <Route
          path="/signup"
          render={() => <Signup signup={this.signup} />}
        />
        <Route
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
        <PrivateRoute 
          path="/home"
          component={Home}
          getUsername={this.getUsername}
        />
      </div>
    );
  }
}

export default App;

/*
  Reference of login/signup module: https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367
*/
