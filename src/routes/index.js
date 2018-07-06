import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';

import Auth from './Auth';
import Login from './Login';
import Register from './Register';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/login"    render = {props => <Login {...props}/>}/>
      <Route exact path="/auth"     render = {props => <Login {...props}/>}/>
      <Route exact path="/register" render = {props => <Auth {...props}/>}/>
    </Switch>
  </Router>

)