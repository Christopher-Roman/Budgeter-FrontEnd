import React from 'react';
require('../App.css')

const HeaderApp = (props) => {
	return (
		<div>
			<ul>
				{props.userInfo.loggedIn ? <li><a onClick={props.handleLogout} href="#">Logout</a></li> : <li/>}
				<li><a href="#">Test</a></li>
				<li><a href="#">Test</a></li>
				<li><a href="#">Test</a></li>
				<li><a href="#">Test</a></li>
			</ul>
		</div>
	)
}

export default HeaderApp