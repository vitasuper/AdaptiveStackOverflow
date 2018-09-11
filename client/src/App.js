import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

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
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get('/user/')
      .then((response) => {
        console.log('client/App.js - Get user response: ');
        console.log(response.data);
        if (response.data.user) {
          console.log('client/App.js - Get User: There is a user saved in the server session: ');

          this.setState({
            loggedIn: true,
            username: response.data.user.username,
          });
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null
          });
        }
      });
  }

  updateUser = (userObject) => {
    this.setState(userObject);
  }

  /*
    Set up React Router to direct which component to render
  */
  render() {
    return (
      <div className="App">
        <Navbar
          updateUser={this.updateUser}
          loggedIn={this.state.loggedIn}
        />

        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Hi! {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home}
        />
        <Route
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
        <Route
          path="/signup"
          render={() => <Signup signup={this.signup} />}
        />
      </div>
    );
  }
}

export default App;

/*
  Reference of login/signup module: https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367
*/
