import React from 'react';
require('../App.css')


//*****************************************//
//										   //
//		Simple header component that 	   //
//		will offer additional options      //
//		as the site is built out.		   //
//		Rendered in App.js				   //
//										   //
//*****************************************//


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