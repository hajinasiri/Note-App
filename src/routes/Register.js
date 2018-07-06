import React from 'react';

export default class Register extends React.Component {
  state = {
    username:'',
    email:'',
    password:'',
    isAdmin:false
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = () => {

  }
  render() {
    return (
      <div>
        <input name='username' placeholder='Username' onChange={e => this.onChange(e)} value={this.state.username}/>
        <input name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.state.email} />
        <input name='password' placeholder='Password' type='password' onChange={e => this.onChange(e)} value={this.state.password} />
        <button onClick={() => this.onSubmit()} type='primary' > Primary </button>
      </div>
    )
  }

}