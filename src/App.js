import React, { Component } from 'react';
import REACT_APP_URL from './Variables.js'
import Register from './Register'
import Login from './Login'
import BudgetContainer from './BudgetContainer'
import HeaderApp from './Header'
require('./App.css')


class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      loginFail: false,
      register: false
    }
  }
  handleLogout = async (e) => {
    e.preventDefault();
    try {
      const logoutRequest = await fetch(REACT_APP_URL + '/users/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const logoutRequestParsed = await logoutRequest.json();

      if(logoutRequestParsed.status === 200) {
        this.setState({
          loggedIn: false,
          loginFail: false
        })
      } else {
        console.log('Logout Request Error -- ', logoutRequestParsed.error);
      }
    } catch(err) {
      console.error(err)
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await fetch(REACT_APP_URL + '/users/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedResponse = await loginResponse.json()
    if(parsedResponse.status === 200) {
      this.setState({
        loggedIn: true,
        loginFail: false,
        register: false
      })
    } else if(parsedResponse.status === 401){
      this.setState({
        loginFail: true,
        loggedIn: false,
        register: false
      })
    }else {
      this.setState({
        loginFail: true,
        loggedIn: false,
        register: false
      })
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  register = (e) => {
    e.preventDefault();
    this.setState({
      register: true,
      loginFail: false
    })
  }
  loggedIn = (e) => {
    this.setState({
      loggedIn: true,
      register: false,
      loginFail:false
    })
  }
  haveAnAccount = (e) => {
    this.setState({
      register: false,
      loginFail: false
    })
  }
  render(){
    return (
      <div>
        <div >
          <div className='navbar'>
              <HeaderApp userInfo={this.state} handleLogout={this.handleLogout}/>
          </div>
        </div>
          <div className='container'>
            {!this.state.loggedIn && !this.state.loginFail && !this.state.register ? <Login registration={this.register} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> : null }
            {this.state.register || this.state.loginFail ? <Register haveAnAccount={this.haveAnAccount} loggedIn={this.loggedIn} register={this.register} userInfo={this.state} /> : null}
            {this.state.loggedIn && !this.state.loginFail && !this.state.register ? <BudgetContainer handleChange={this.handleChange} userInfo={this.state} /> : null }
          </div>
      </div>
    )
  }
}

export default App;
