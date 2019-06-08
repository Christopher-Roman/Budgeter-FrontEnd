import React, { Component } from 'react';
import REACT_APP_URL from '../Variables.js'
import UserContainer from '../UserContainer'
require('../App.css')

class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			isValid: null
		}
	}
	registrationFailed = () => {
		this.setState({
			isValid: false
		})
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
    }
    handleSubmit = async (e) => {
    	e.preventDefault();
    	const registerResponse = await fetch(REACT_APP_URL + '/users/register', {
    		method: 'POST',
    		credentials: 'include',
    		body: JSON.stringify(this.state),
    		headers: {
    			'Content-Type': 'application/json'
    		}
    	})
    	const parsedResponse = await registerResponse.json()
    	if(parsedResponse.status === 200) {
     		this.setState({
        		isValid: true,
        		register: false
        	})
        	this.props.loggedIn()
    		console.log('Registration successful');
    	} else {
    		this.registrationFailed()
    		console.log('Could Not Register. Please try again.');
    	}
    }
    render(){
    	let registration = null
    	if(this.props.userInfo.loginFail === true) {
    		registration = <h6>Looks like the credentials you entered are incorrect. Do you need to make an account?</h6>
    		return (
		      <div>
		      <br/>
		      	{registration}
		        <form onSubmit={this.handleSubmit}>
		          <input name='username' placeholder='Username' type='text' onChange={this.handleChange}></input>
		          <input name='password' placeholder='Password' type='password' onChange={this.handleChange}></input>
		          <button>Submit</button>
		        </form>
		      </div>
	    	)
    	} else if(this.props.userInfo.loginFail === false && this.props.userInfo.register === true) {
    		registration = <h6>Please register using the form below.</h6>
    		return (
    			<div>
    			{registration}
	    			<form onSubmit={this.handleSubmit}>
			          <input name='username' placeholder='Username' type='text' onChange={this.handleChange}></input>
			          <input name='password' placeholder='Password' type='password' onChange={this.handleChange}></input>
			          <button>Submit</button>
			        </form>
			    </div>

    		)
    	} else {
    		return (
    		<UserContainer />
    		)
    	}
    }
}

export default Register;