import React, { Component } from 'react';
require('../App.css')



//*****************************************//
//                                         //
//      Registration component with        //
//      conditional rendering in App.js    //
//                                         //
//*****************************************//

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
    	const registerResponse = await fetch(process.env.REACT_APP_URL + '/users/register', {
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
        	}, () => {
        	   this.props.loggedIn()
            })
    		console.log('Registration successful');
    	} else {
    		this.registrationFailed()
    		console.log('Could Not Register. Please try again.');
    	}
    }
    render(){   
    	if(this.props.userInfo.loginFail === true) {
    		return (
		      <div>
                <h6>Looks like the credentials you entered are incorrect. Do you need to make an account?</h6>
                    <div is="custom-elem" class='registerCard'>
                        <div is="custom-elem" class='registerContainer'>
                            <h1>Register</h1>
                            <form onSubmit={this.handleSubmit}>
                              <input name='username' placeholder='Username' type='text' onChange={this.handleChange}></input>
                              <br/>
                              <br/>
                              <input name='password' placeholder='Password' type='password' onChange={this.handleChange}></input>
                              <br/>
                              <br/>
                              <button is="custom-elem" class='register'>Submit</button>
                            </form>
                            <h6>Have an Account? <button className='register' onClick={this.props.haveAnAccount}>Close</button></h6>
                        </div>
                    </div>
                </div>
	    	)
    	} else if(this.props.userInfo.loginFail === false && this.props.userInfo.register === true) {
    		return (
    			<div>
                    <div is="custom-elem" class='registerCard'>
                        <div is="custom-elem" class='registerContainer'>
                            <h1>Register</h1>
        	    			<form onSubmit={this.handleSubmit}>
        			          <input name='username' placeholder='Username' type='text' onChange={this.handleChange}></input>
        			          <br/>
                              <br/>
                              <input name='password' placeholder='Password' type='password' onChange={this.handleChange}></input>
        			          <br/>
                              <br/>
                              <button is="custom-elem" class='register'>Submit</button>
        			        </form>
                            <h6>Have an Account? <button className='register' onClick={this.props.haveAnAccount}>Close</button></h6>
                        </div>
                    </div>
			    </div>
    		)
    	} 
    }
}

export default Register;