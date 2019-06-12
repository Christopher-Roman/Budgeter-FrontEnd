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
				<div key={budget._id}>
					<div className="card">
						<div className='container'>
							<label className='budgetLabel'>Budget:</label>
							<br/>
							{budget.budgetName}
							<br/>
							<br/>
							<button className='viewBudget' onClick={props.openBudget.bind(null, budget)}>View</button>
							<button className='delete' onClick={props.deleteBudget.bind(null, budget._id)}>Delete</button>
						</div>
					</div>
				</div>
			)
		})
			return (
				<div>
					Should we get started?
					{response}
					<br/>
					{budgets}
					<br/>
				</div>
			)
	}
}

export default Budget