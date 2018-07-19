import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect} from 'react-router-dom';

import Auth from './Auth';
import Login from './Login';
import Register from './Register';
import decode from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    // { exp: 12903819203 }
    const { exp } = decode(token);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }

  } catch (e) {
    return false;
  }

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
)




export default () => (
  <Router>
    <Switch>
      <Route exact path="/login"    render = {props => <Login {...props}/>}/>
            <AuthRoute exact path="/auth" component={Auth} />
      <Route exact path="/register" render = {props => <Register {...props}/>}/>
    </Switch>
  </Router>

)