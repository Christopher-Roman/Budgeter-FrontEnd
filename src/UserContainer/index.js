import React, { Component } from 'react';
import Modal from 'react-modal'
import REACT_APP_URL from '../Variables.js'
import Budget from '../Budget'
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

class UserContainer extends Component {
	constructor(){
		super();
		this.state = {
			budgetName: '',
			netMonthlyIncome: '',
			budgets: [],
			budgetItems: [],
			activeBudget: false,
      		createBudget: false,
      		createItem: false
		}
	}
	getBudget = async () => {
		const budget = await fetch(REACT_APP_URL + '/budget', {
			method: 'GET',
			'credentials': 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const budgetParsedResponse = await budget.json();
		return budgetParsedResponse
	}
	componentDidMount() {
		this.getBudget().then(budgets => {
			if(budgets.status === 200) {
				let budgetArray = budgets.data[0].budget
				this.setState({
					budgets: [...budgetArray],
					activeBudget: true
				})
			} else {
				this.setState({
					activeBudget:false
				})
			}
		})
	} 
	createBudgetModal = () => {
		this.setState({
			createBudget: true,
			createItem: false
		})
	}
	closeBudgetModal = () => {
		this.setState({
			createBudget: false,
			createItem: false
		})
	}
	newBudget = async (e) => {
		e.preventDefault();
		console.log('Route was hit!');
		try {
			let incomeParsed = parseInt(this.state.netMonthlyIncome)
			const newBudget = await fetch(REACT_APP_URL + '/budget/new', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					budgetName: this.state.budgetName,
					netMonthlyIncome: incomeParsed
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const newBudgetParsed = await newBudget.json();
			this.setState({
				budgets: [...this.state.budgets, newBudgetParsed.data],
				createBudget: false
			})
			console.log(this.state.budgets);

		} catch(err) {
			console.error(err);
			throw err
		}
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
  	}
	render() {
		return (
			<div>
				<div>
					{this.state.activeBudget ? <span>Hello, {this.props.userInfo.username}, ready to get started on a new budget?</span> : <span>Hello, {this.props.userInfo.username}, ready to continue working on your budget?</span>}
				<Budget userInfo={this.props.userInfo} budgetInfo={this.state.budgets} />
				</div>
				<br/>
				<br/>
				<br/>
				<button onClick={this.createBudgetModal}>Create New Budget?</button>
				<Modal 
					isOpen={this.state.createBudget} 
					style={customStyles}
					onRequestClose={this.closeBudgetModal}>
		          	<div>Create a new Budget!</div>
		          	<br/>
		          	<form onSubmit={this.newBudget}>
		          		<label>Budget Name</label>
		          		<br/>
			            <input name='budgetName' type='text' onChange={this.handleChange} />
			            <br/>
			            <label>Net Monthly Income</label>
			            <br/>
			            <input name='netMonthlyIncome' type='text' onChange={this.handleChange} />
		          		<br/>
		          		<button>Submit</button>
		          	</form>
		          	<button onClick={this.closeBudgetModal}>close</button>
		        </Modal>
			</div>
		)
	}
}

export default UserContainer;