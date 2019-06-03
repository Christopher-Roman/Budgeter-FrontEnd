import React, { Component } from 'react';
import HeaderApp from '../Header'
import REACT_APP_URL from '../Variables.js'
import Budget from '../Budget'
import Empty from '../Empty'
require('../App.css')

class UserContainer extends Component {
	constructor(){
		super();
		this.state = {
			budgets: [],
			budgetItems: [],
			activeBudget: false,
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
				this.setState({
					budgets: [...budgets.data],
					activeBudget: true
				})
			} else {
				this.setState({
					activeBudget:false
				})
			}
		})
	} 
	render() {
		console.log(this.props.userInfo);
		return (
			<div>
				<div>
					{this.state.activeBudget ? <span>Hello, {this.props.userInfo.username}, ready to get started on a new budget?</span> : <span>Hello, {this.props.userInfo.username}, ready to continue working on your budget?</span>}
				</div>
				<br/>
				<br/>
				<br/>
				<Budget userInfo={this.props.userInfo} budgetInfo={this.state.budgets} />
			</div>
		)
	}
}

export default UserContainer;