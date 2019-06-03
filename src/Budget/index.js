import React from 'react';
import HeaderApp from '../Header'
import REACT_APP_URL from '../Variables.js'
import UserContainer from '../UserContainer'
require('../App.css')

const Budget = (props) => {
	console.log(props.budgetInfo);
	let response = <p/>
	if(props.budgetInfo.length <= 0) {
		response = <p>You need to put together a budget dude!</p>
		return response
	} else {
		response = <p>Here is a list of your budgets!</p>
		const budgets = props.budgetInfo.map((budget, i) => {
			return (
				<li key={i}>
					{budget}
				</li>
			)
		})
			return (
				<div>
					Should we get started?
					{response}
					<ul>
					{budgets}
					</ul>
				</div>
			)
	}
}

export default Budget