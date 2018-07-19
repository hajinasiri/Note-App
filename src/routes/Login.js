import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Login extends React.Component {
  state = {
    email:'',
    password:'',
    token: "abc"
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
    console.log(response.data);
    const token = response.data.login;
    localStorage.setItem('token', token);
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
mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
`;

export default graphql(mutation)(Login);