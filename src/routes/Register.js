import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Register extends React.Component {
  state = {
    username:'',
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
        <input name='username' placeholder='Username' onChange={e => this.onChange(e)} value={this.state.username}/>
        <input name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.state.email} />
        <input name='password' placeholder='Password' type='password' onChange={e => this.onChange(e)} value={this.state.password} />
        <br/>
        <button onClick={() => this.onSubmit()} type='primary' > Submit </button>
      </div>
    )
  }

}

const mutation = gql`
mutation($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
  }
}
`;

export default graphql(mutation)(Register);
