import React, { Component } from 'react';
import Modal from 'react-modal'
import REACT_APP_URL from '../Variables.js'
require('../App.css')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class BudgetView extends Component {
	constructor(props){
		super();
		this.state = {
			budgetId: props.budgetToView._id,
			itemName: '',
			itemAmount: '',
			budgetItems: []
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
	getBudget = async () => {
		const budget = await fetch(REACT_APP_URL + '/budget/' + this.state.budgetId, {
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
			const newBudgetItem = await fetch(REACT_APP_URL + '/budget/' + this.state.budgetId + '/item/new', {
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
			console.log(newBudgetItem);
			const parsedBudgetItem = await newBudgetItem.json()
			console.log(parsedBudgetItem);
			this.setState({
				budgetItems: [...this.state.budgetItems, parsedBudgetItem.data]
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
	render() {
		const budgetItems = this.state.budgetItems.map((budgetItems) => {
				return (
					<div key={budgetItems._id}>
						<div className="card">
						  <div className="container">
						    <b>Item: {budgetItems.itemName}</b> 
						    <br/>
						    <b>Cost: {budgetItems.amount}</b> 
						  </div>
						</div>
					</div>
				)
			})
		let budgetViewModal = this.props.budgetViewModal
		
		return (
			<Modal 
				isOpen={this.props.budgetViewModal} 
				onRequestClose={this.props.budgetViewToggle}>
				<div>{this.props.budgetToView.budgetName}</div>
		      	<div>{this.props.budgetToView.netMonthlyIncome}</div>
				<label className='budgetLabel'>Budget:</label>
				<br/>
	      		{budgetItems}
		      	<br/>
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

		      	<button onClick={this.props.budgetViewToggle}>close</button>
		    </Modal>
		)
	}
}

export default BudgetView