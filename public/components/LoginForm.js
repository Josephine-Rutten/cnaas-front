import React from 'react';
import PropTypes from 'prop-types';
class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render () {
    if (this.props.show !== true) {
      if(localStorage.getItem('expiration_time') * 1000 < new Date()){
        this.errorMessage = "Your token has expired. ";
      }
      return (
        <div>
          <p className='title error'>{this.errorMessage}</p>
          <button className='logout' onClick={ev => this.props.logout()}>
            Logout
          </button>
        </div>
      )
    }

    if (process.env.OIDC_ENABLED == "true"){
      return (
        <div className='container'>
          <form onSubmit={this.props.oauthLogin}>
            <p className='title error'>{this.props.errorMessage}</p>
            <button className='submit' type='submit'>
              Login with OAUTH
            </button>
          </form>
        </div>
      )
    }
    return (
      <div className='container'>
        <form
          onSubmit={event =>
            this.props.login(event, this.state.email, this.state.password)
          }
        >
          <label>
            Email
            <input
              type='text'
              name='email'
              onChange={this.handleInput}
              required
            />
          </label>
          <label>
            Password
            <input
              type='password'
              name='password'
              onChange={this.handleInput}
              required
            />
          </label>
          <p className='title error'>{this.props.errorMessage}</p>
          <button className='submit' type='submit'>
            Login
          </button>
        </form>
      </div>
    )
  }
}
LoginForm.propTypes = {
  login: PropTypes.func,
  oauthLogin: PropTypes.func,
  logout: PropTypes.func,
  show: PropTypes.bool,
  errorMessage: PropTypes.string
};
export default LoginForm
