import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    console.log('client/src/components/signUp.js - handleSubmit, username: ');
    console.log(this.state.username);

    e.preventDefault();

    // Send a POST request to our backend server to add a new username & password
    axios.post('/user/signup', {
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        console.log(response);

        if (!response.data.error) { // If not getting `error` property in `response.data`
          console.log('Successful signup');
          this.setState({
            // Set property to redirect to login page
            redirectTo: '/login', // Note: This url is used in React router of our frontend
          });
        } else {
          console.log('Username already taken, please take another one');
        }
      })
      .catch((error) => {
        console.log('Signup error: ');
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      /*
        If redirect property is not null, redirect to login page 
        (which is getting from `handleSubmit`)
      */
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }

    return (
      <div className="SignupForm">
        <h4>Sign up</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="username">Username</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
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
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="password">Password: </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                placeholder="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-7" />
            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
