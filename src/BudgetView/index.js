import React, { Component } from 'react';
import Modal from 'react-modal'
import {Doughnut} from 'react-chartjs-2';
// import { defaults } from 'react-chartjs-2'
// defaults.global.legend.display = false;

//*****************************************//
//										   //
//		View of specifically selected	   //
//		budget and items listed within     //
//		selected budget					   //
//		Conditional rendering in    	   //
//		BudgetContainer.             	   //
//										   //
//*****************************************//

require('../App.css')

//Styles for Modal
const customStyles = {
  content : {
    backgroundColor: 'rgba(69,179,224)'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')



class BudgetView extends Component {

	constructor(props){
		super(props);
		this.state = {
			budgetId: props.budgetToView._id,
			itemName: '',
			itemAmount: '',
			budgetItems: [],
			createItem: false
		}
	}
	componentDidMount(){
		this.getBudget().then(budget => {
			if(budget.status === 200) {
				this.setState({
					budgetItems: [...budget.data.budgetItem]
				})
			} else {
				this.setState({
					budgetItem: []
				})
			}
		})
	}
	componentWillUnmount() {

	}
	getBudget = async () => {
		const budget = await fetch(process.env.REACT_APP_URL + '/budget/' + this.state.budgetId, {
			method: 'GET',
			'credentials': 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const budgetParsedResponse = await budget.json();
		return budgetParsedResponse
	}
	createBudgetItem = async (e) => {
		e.preventDefault();
		try {
			let cost = parseInt(this.state.itemAmount)
			const newBudgetItem = await fetch(process.env.REACT_APP_URL + '/budget/' + this.state.budgetId + '/item/new', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					itemName: this.state.itemName,
					amount: cost
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedBudgetItem = await newBudgetItem.json()

			this.setState({
				budgetItems: [...parsedBudgetItem.data.budgetItem],
				itemName: '',
				itemAmount: '',
				createItem: false
			})

		} catch(err) {
			console.error(err)
		}
	}
	deleteBudgetItem = async (id) => {
		try {
			const deletedBudgetItem = await fetch(process.env.REACT_APP_URL + '/budget/' + this.props.budgetToView._id + '/item/' + id + '/delete', {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await deletedBudgetItem.json()
			console.log(parsedResponse);
			let budgetItems = parsedResponse.data.budgetItem
			this.setState({
				budgetItems: budgetItems
			})
		} catch(err) {
			console.error(err)
		}
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
  	}
  	createItemToggle = () => {
  		if(this.state.createItem) {
  			this.setState({
  				createItem: false
  			})
  		} else {
  			this.setState({
  				createItem: true
  			})
  		}
  	}
	render() {

		const budgetItems = this.state.budgetItems.map((budgetItems) => {
				return (
					<div key={budgetItems._id}>
						<div className="itemCard">
						  <div className="itemContainer">
						    <b>Item:</b> <span> </span>{budgetItems.itemName} 
						    <br/>
						    <b>Cost:</b> <span> </span>{budgetItems.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })} 
						    <div className='buttonContainer'>
							    <button className='itemEditButton' >Edit</button>
							    <button className='itemDeleteButton' onClick={this.deleteBudgetItem.bind(null, budgetItems._id)}>Delete</button>
							</div>
						  </div>
						</div>
					</div>
				)
		})
		const itemNames = this.state.budgetItems.map(item => item.itemName)

		const itemAmount = this.state.budgetItems.map(item => item.amount)

		let amounts = []

		amounts = itemAmount

		const totalAmount = amounts.reduce((accum, currVal) => {
			return accum + currVal
		}, 0)

		let remainingFunds = this.props.budgetToView.netMonthlyIncome - totalAmount

		const data = {
			labels: itemNames,
			datasets: [{
				data: itemAmount,
				backgroundColor: [
					'#88bdbc',
					'#254e58',
					'#112d32',
					'#4f4a41',
					'#6e6658',
					'#88bdbc',
					'#254e58',
					'#112d32',
					'#4f4a41',
					'#6e6658'
				],
				hoverBackgroundColor: [
					'#88bdbc',
					'#254e58',
					'#112d32',
					'#4f4a41',
					'#6e6658',
					'#88bdbc',
					'#254e58',
					'#112d32',
					'#4f4a41',
					'#6e6658'
				]
			}]
		}
		const options = {
	    	legend: {
	    		display: true,
	    	},
	    	responsive: true,
	    	maintainAspectRatio: false,
	    	tooltips: {
		      displayColors: false,
		      titleFontSize: 16,
		      bodyFontSize: 14,
		      xPadding: 10,
		      yPadding: 10
		  	}
		}
		return (
			<Modal 
				closeTimeoutMS={1000}
				isOpen={this.props.budgetViewModal} 
				style={customStyles}
				onRequestClose={this.props.budgetViewToggle}>
				<div className='closeContainer'>
					<div className='closeModal'>
						<button className='modalClose' onClick={this.props.budgetViewToggle}>+</button>
					</div>
				</div>
				<div className='budgetTotalsContainer'>
					<div className='budgetInfoCard'>
						<div className='budgetInfoContainer'>
							<span className='income'>Budget Name:</span>
			      			<br/>
							<div className='info'>
								<span>{this.props.budgetToView.budgetName}</span>
							</div>
			      			<br/>
							<span className='income'>Net Income:</span>
			      			<br/>
					      	<div className='info'>
					      		<span>{this.props.budgetToView.netMonthlyIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</span>
					      	</div>
				      	</div>
				    </div>
		    		<div className='budgetCalcCard'>
		    			<div className='budgetCalcInfoContainer'>
			    			<span className='income'>Total Expenses:</span>
			      			<br/>
							<div className='info'>
								<span>{totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</span>
							</div>
			      			<br/>
							<span className='income'>Available Funds:</span>
			      			<br/>
					      	<div className='info'>
					      		<span>{remainingFunds.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</span>
					      	</div>
		    			</div>
		    		</div>
				</div>
				<br/>
				<br/>
				<label className='budgetLabel'>Expenses:</label>
				<br/>
				<br/>
				<div className='itemsAndGraphContainer'>
					<div>
		      			{budgetItems}
				      	{this.state.createItem ?
				      	<div className='newItemForm'>
					      	<form onSubmit={this.createBudgetItem}>
					      		<label>Item Name</label>
					      		<br/>
					      		<input type='text' name='itemName' onChange={this.handleChange}></input>
					      		<br/>
					      		<label>Monthly Cost</label>
					      		<br/>
					      		<input type='text' name='itemAmount' onChange={this.handleChange}></input>
					      		<br/>
					      		<div className='buttonContainer'>
						      		<button className='submitItem' type='submit'>Create</button>
						      		<button className='closeCreate' onClick={this.createItemToggle}>Close</button>
						      	</div>
					      	</form>
					    </div>
				      	: <button className='addItemButton' onClick={this.createItemToggle}>Add an Expense?</button>}
		      		</div>
			      	<div className='budgetGraph'>
			      		<Doughnut data={data} options={options} height={300} width={300} />
			      	</div>
			    </div>
		    </Modal>
		)
	}
}

export default BudgetView