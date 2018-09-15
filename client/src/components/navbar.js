import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { myAuth } from '../utils/privateRoute';
import Moment from 'react-moment';
import '../App.css';
import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('client/src/components/navbar.js - logging out');
    axios.post('/user/logout')
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
            lastLoginTime: ''
          });
        }
      }).catch((error) => {
        console.log('Logout error');
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;

    console.log('client/src/components/navbar.js - navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        {loggedIn
          ? (
            <div>
              <header className="navbar App-header text-light">
                <section className="navbar-section">
                  <a class="navbar-brand mr-2 text-gray">Adaptive StackOverflow</a>
                  <Link to="/home" className="btn btn-link text-light">Home</Link>
                  <Link
                    to="#"
                    className="btn btn-link text-light"
                    onClick={(e) => {
                      myAuth.signout();
                      this.logout(e);
                    }}
                  >
                    Logout
                  </Link>
                </section>
                <section className="navbar-section">
                  <div className="chip">
                    <img src="https://picsum.photos/200/300/?random" className="avatar avatar-sm" />
                      {this.props.username}
                  </div>
                  <div className="chip">
                    Last visit: <Moment fromNow>{this.props.lastLoginTime}</Moment>
                  </div>
                </section>
              </header>
            </div>
          ) : (
            <div>
              <header className="navbar App-header">
                <section className="navbar-section">
                  <a class="navbar-brand mr-2 text-gray">Adaptive StackOverflow</a>
                  <Link to="/login" className="btn btn-link text-light">Login</Link>
                  <Link to="/signup" className="btn btn-link text-light">Sign up</Link>
                </section>
              </header>
            </div>
          )
        }
      </div>
    );
  }
}

export default Navbar;
