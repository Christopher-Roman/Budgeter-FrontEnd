import React, { Component } from 'react';
import Modal from 'react-modal'
import REACT_APP_URL from '../Variables.js'
require('../App.css')

Modal.setAppElement('#root')



class BudgetView extends Component {
	_isMounted = false;

	constructor(props){
		super(props);
		this.state = {
			budgetId: props.budgetToView._id,
			itemName: '',
			itemAmount: '',
			budgetItems: [],

		}
	}
	componentDidMount(){
		console.log(this.props.budgetToView.budgetItem);
		this._isMounted = true
		this.getBudget().then(budget => {
			if(budget.status === 200) {
				this.setState({
					budgetItems: [...budget.data.budgetItem]
				}, () => {
					this.componentDidUpdate()
				})
			} else {
				this.setState({
					budgetItem: []
				})
			}
		})
	}
	componentDidUpdate() {
		if(this._isMounted === true) {
			this.getBudget().then(budget => {
				if(budget.status === 200 && this._isMounted === true) {
					this.setState({
						budgetItems: [...budget.data.budgetItem]
					})
				} else if (budget.status !== 200 && this._isMounted === true) {
					this.setState({
						budgetItem: []
					})
				}
			})
		}
	}
	componentWillUnmount() {
		this._isMounted = false
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
			await this.setState({
				budgetItems: [...this.state.budgetItems, parsedBudgetItem.data],
				itemName: '',
				itemAmount: ''
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
						    <b>Item:</b> {budgetItems.itemName} 
						    <br/>
						    <b>Cost:</b> {budgetItems.amount} 
						  </div>
						</div>
					</div>
				)
			})
		
		return (
			<Modal 
				isOpen={this.props.budgetViewModal} 
				onRequestClose={this.props.budgetViewToggle}>
				<div>{this.props.budgetToView.budgetName}</div>
		      	<div>{this.props.budgetToView.netMonthlyIncome}</div>
				<label className='budgetLabel'>Budget:</label>
				<br/>
				<br/>
	      		{budgetItems}
		      	<br/>
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