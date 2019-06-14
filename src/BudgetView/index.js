import React, { Component } from 'react';
import Modal from 'react-modal'
require('../App.css')

const customStyles = {
  content : {
    backgroundColor		  : 'rgba(69,179,224)'
  }
};

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
						  </div>
						</div>
					</div>
				)
			})
		
		return (
			<Modal 
				closeTimeoutMS={1000}
				isOpen={this.props.budgetViewModal} 
				style={customStyles}
				onRequestClose={this.props.budgetViewToggle}>
				<div className='closeContainer'>
					<div className='closeModal'>
						<button className='modalClose' onClick={this.props.budgetViewToggle}>X</button>
					</div>
				</div>
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
		      	<br/>
				<br/>
				<label className='budgetLabel'>Expenses:</label>
				<br/>
				<br/>
	      		{budgetItems}
		      	<br/>
		      	<br/>
		      	{this.state.createItem ?
		      	<form onSubmit={this.createBudgetItem}>
		      		<label>Item Name</label>
		      		<br/>
		      		<input type='text' name='itemName' onChange={this.handleChange}></input>
		      		<br/>
		      		<label>Monthly Cost</label>
		      		<br/>
		      		<input type='text' name='itemAmount' onChange={this.handleChange}></input>
		      		<br/>
		      		<input type='submit'/>
		      	</form>
		      	: <button onClick={this.createItemToggle}>Add an Expense?</button>}
		    </Modal>
		)
	}
}

export default BudgetView