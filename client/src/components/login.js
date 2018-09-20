import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { myAuth } from '../utils/privateRoute';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      loginFail: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('client/src/components/login.js - handleSubmit');

    const self = this;

    /*
      Get basic information and get user profile inside this POST request
    */
    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log('client/src/components/login.js - login response: ');
        console.log(response);
        if (response.status === 200) {
          myAuth.authenticate();
          // Get user profile here
          axios
            .post('/userprofile/' + response.data.username)
            .then((innerresponse) => {
              /*
                Update App.js so we can re-render our components in App
              */
              self.props.updateUser({
                loggedIn: true,
                username: response.data.username,
                lastLoginTime: innerresponse.data.lastLoginTime,  // Get last login time from here
                currentLoginTime: new Date(),
              });

              // Update the state to redirect to home
              self.setState({
                redirectToReferrer: true,
                loginFail: '',
              });
            });
          
          // in order to set initial userevent for this user
          axios
            .post('/userevent/' + response.data.username + '/types/userLoginEvent')
            .then((innerresponse) => {
              console.log(innerresponse);
            }).catch((error) => {
              console.log(error);
            });
          
        }
      }).catch((error) => {
        console.log('client/src/components/login.js - login error: ');
        console.log(error);
        this.setState({
          loginFail: 'true',
        });
      });
  }

  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      console.log('============TRYING TO REDIRECT TO HOME==========');
      return <Redirect to="/home" />;
    }
    return (
      <div className="LoginForm">
        <h2 className="col-4 col-mx-auto">LOGIN</h2>
        {this.state.loginFail && 
        <div className="col-3 col-mx-auto">
          <div className="toast toast-error">
              Login fail. Please check your info.
            </div>
        </div>
        }
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-3 col-mx-auto">
              <input className="form-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-mx-auto">
              <input className="form-input"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <button
              className="btn btn-primary col-3 col-mx-auto"
              id="login-signup-button"
              onClick={this.handleSubmit}
              type="submit"
            >
                LOGIN
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
