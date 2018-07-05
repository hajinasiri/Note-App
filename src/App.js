import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' exact render={
            () => {
              return (<h1>This is the router</h1>)
            }
          }/>

          <Route path='/about' exact render={
            () => {
              return (<h1>This is about</h1>)
            }
          }/>

        </div>
        </Router>
    );
  }
}

export default App;
