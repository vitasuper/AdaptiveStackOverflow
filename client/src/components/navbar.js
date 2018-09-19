import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { myAuth } from '../utils/privateRoute';
import Moment from 'react-moment';
import '../App.css';
import axios from 'axios';
import vmoment from 'moment';

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

          var startDate = vmoment(this.props.currentLoginTime, 'YYYY-MM-DD HH:mm:ss');
          var endDate = vmoment(new Date(), 'YYYY-MM-DD HH:mm:ss');
          var duration = vmoment.duration(endDate.diff(startDate));
          var seconds = duration.asSeconds();
          console.log("hey longyue!!!: " + seconds);

          axios
            .post('/userevent/' + this.props.username + '/types/userStaytimeEvent', { extraInfo: seconds.toString() })
            .then((innerresponse) => {
                console.log(innerresponse.data);
            }).catch((error) => {
                console.log('save error');
            });

          this.props.updateUser({
            loggedIn: false,
            username: null,
            lastLoginTime: '',
            currentLoginTime: '',
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
                  <Link to="/vis" className="btn btn-link text-light">Visualization</Link>
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
