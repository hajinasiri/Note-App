import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import First from './pages/first_page/First';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' exact component={First} />

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
