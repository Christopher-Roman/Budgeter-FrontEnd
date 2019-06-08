import React from 'react';
require('../App.css')

const HeaderApp = (props) => {
	return (
		<div>
			<ul>
				{props.userInfo.loggedIn ? <li className='navbar'><a onClick={props.handleLogout} href="/">Logout</a></li> : null}
				<li className='navbar'><a href="http://localhost:3000/">Test</a></li>
				<li className='navbar'><a href="http://localhost:3000/">Test</a></li>
				<li className='navbar'><a href="http://localhost:3000/">Test</a></li>
				<li className='navbar'><a href="http://localhost:3000/">Test</a></li>
			</ul>
		</div>
	)
}

export default HeaderApp