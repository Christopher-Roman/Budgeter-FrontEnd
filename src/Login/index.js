import React from 'react';
require('../App.css')


//*****************************************//
//										   //
//		Stateless login component with     //
//		Conditional rendering in App.js	   //
//										   //
//*****************************************//

const Login = (props) => {
	return (
		<div>
			<div className='loginCard'>
				<div className='loginContainer'>
					<h1>Login</h1>
			        <form onSubmit={props.handleSubmit}>
			          <input label='Username' name='username' placeholder='Username' type='text' onChange={props.handleChange}></input>
			          <br/>
			          <br/>
			          <input label='Password' name='password' placeholder='Password' type='password' onChange={props.handleChange}></input>
			          <br/>
			          <br/>
			          <button className='login'>Submit</button>
			        </form>
					<h6>Need an Account? <button className='login' onClick={props.registration}>Register...</button></h6>
				</div>
			</div>
	     </div>
	)
}

export default Login;