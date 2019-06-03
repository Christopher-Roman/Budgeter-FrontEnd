import React from 'react';
require('../App.css')

const Login = (props) => {
	return (
		<div>
			<h1>Login</h1>
	        <form onSubmit={props.handleSubmit}>
	          <input label='Username' name='username' placeholder='Username' type='text' onChange={props.handleChange}></input>
	          <input label='Password' name='password' placeholder='Password' type='password' onChange={props.handleChange}></input>
	          <button>Submit</button>
	        </form>
			<h6>Or <button onClick={props.registration}>Register...</button></h6>
	     </div>
	)
}

export default Login;