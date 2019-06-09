import React from 'react';
require('../App.css')

const Budget = (props) => {
	let response = null
	if(props.budgetInfo.length <= 0) {
		response = <p>You need to put together a budget dude!</p>
		return response
	} else {
		response = <p>Here is a list of your budgets!</p>
		let foundBudgets = props.budgetInfo
		const budgets = foundBudgets.map((budget) => {
			return (
				<li key={budget._id}>
					<label className='budgetLabel'>Budget:</label>
					<br/>
					{budget.budgetName}
					<br/>
					<button onClick={props.openBudget.bind(null, budget)}>View Budget</button>

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