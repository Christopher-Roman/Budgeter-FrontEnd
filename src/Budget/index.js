import React from 'react';
require('../App.css')

const Budget = (props) => {
	let response = <p/>
	if(props.budgetInfo.length <= 0) {
		response = <p>You need to put together a budget dude!</p>
		return response
	} else {
		response = <p>Here is a list of your budgets!</p>
		let foundBudgets = props.budgetInfo
		const budgets = foundBudgets.map((budget, i) => {
			return (
				<div key={i}>
					<label className='budgetLabel'>Budget:</label>
					<br/>
					{budget.budgetName}

				</div>
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