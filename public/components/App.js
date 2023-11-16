import React from 'react'
import Header from './Header'
import Panel from './Panel'
import Footer from './Footer'
// needed for routing
import { BrowserRouter } from 'react-router-dom'
import checkResponseStatus from '../utils/checkResponseStatus'
import '../styles/reset.css'
import '../styles/main.css'
import "../styles/prism.css";
import PropTypes from 'prop-types';



class App extends React.Component {
  state = {
    loginMessage: '',
    loggedIn: false
  }

  login = (event, email, password) => {
    event.preventDefault()
    const url = process.env.API_URL + '/api/v1.0/auth'
    const loginString = email + ':' + password
    fetch(url, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(loginString) }
    })
      .then(response => checkResponseStatus(response))
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data['access_token'])
        this.setState({
          loginMessage: 'Login successful',
          loggedIn: true
        })
      })
      .catch(error => {
        localStorage.removeItem('token')
        this.setState({
          loginMessage: error.message,
          loggedIn: false
        })
        console.log(error)
      })
  }

  oauthLogin = event => {
    event.preventDefault()
    const url = process.env.API_URL + '/api/v1.0/auth/login'
    window.location.replace(url)
  }


  logout = () => {
    localStorage.removeItem('token')
    this.setState({
      loginMessage: 'You have been logged out',
      loggedIn: false
    })
  }

  componentDidMount () {
    if (localStorage.getItem('token') !== null) {
      this.setState({ loggedIn: true })
    }
  }

  render () {
    return (
      <div className='container'>
        <BrowserRouter>
          <Header loggedIn={this.state.loggedIn} />
          <Panel
            login={this.login}
            logout={this.logout}
            oauthLogin={this.oauthLogin}
            loginMessage={this.state.loginMessage}
            loggedIn={this.state.loggedIn}
          />
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}
App.propTypes = {
  login: PropTypes.func,
  oauthLogin: PropTypes.func,
  logout: PropTypes.func,
  show: PropTypes.bool,
  errorMessage: PropTypes.string,
  loggedIn: PropTypes.bool,
  loginMessage: PropTypes.string
};
export default App
