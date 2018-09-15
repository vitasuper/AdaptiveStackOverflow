import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const myAuth = {
  isAuthenticated: false,
  authenticate() {
    console.log('client/src/utils/privateRoute.js - trying to set isAuthenticated to true');
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  },
};

export const PrivateRoute = ({ component: Component, getUsername, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      myAuth.isAuthenticated ? (
        <Component {...props} getUsername={getUsername} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
