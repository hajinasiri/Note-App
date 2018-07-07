import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';

import First from './First';
import Login from './Login';
import Register from './Register';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/login"    render = {props => <Login {...props}/>}/>
      <Route exact path="/"     render = {props => <First{...props}/>}/>
      <Route exact path="/register" render = {props => <Register {...props}/>}/>
    </Switch>
  </Router>

)