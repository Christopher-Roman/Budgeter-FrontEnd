import React from 'react';
require('../App.css')

const HeaderApp = (props) => {
	return (
		<div>
			<ul>
				{props.userInfo.loggedIn ? <li className='navbar'><button className='logout' onClick={props.handleLogout} href="/">Logout</button></li> : null}
			</ul>
		</div>
	)
}

export default HeaderApp