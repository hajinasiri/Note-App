import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Login extends React.Component {
  state = {
    email:'',
    password:''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    console.log(response);
  }

  render() {
    return (
      <div>
        <input name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.state.email} />
        <input name='password' placeholder='Password' type='password' onChange={e => this.onChange(e)} value={this.state.password} />
        <br/>
        <button onClick={() => this.onSubmit()} type='primary' > Login </button>
      </div>
    )
  }

}

const mutation = gql`
mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    id
  }
}
`;

export default graphql(mutation)(Login);
