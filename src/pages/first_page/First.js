import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class First extends Component {
  render() {
    return (
      <div>
        <h1> First page hooora! </h1>
        <div>
          <Link to='/login'>Log in </Link>
        </div>
        <div>
          <Link to='/register'>Register </Link>
        </div>

      </div>
    )
  }
}
export default First;