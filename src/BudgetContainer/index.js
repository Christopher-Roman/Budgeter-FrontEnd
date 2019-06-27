import React, { Component } from 'react';
import Modal from 'react-modal'
import Budget from '../Budget'
import BudgetView from '../BudgetView'
import EditBudgetModal from '../EditBudgetModal'
require('../App.css')

//*****************************************//
//										   //
//		Primary container for the user's   //
//		created budgets and other info     //
//		Conditional rendering in App.js	   //
//										   //
//*****************************************//

//Styles for Modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor		  : 'rgba(69,179,224)'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class BudgetContainer extends Component {
	_isMounted = false;
	constructor(props){
		super();
		this.state = {
			budgetName: '',
			username: '',
			netMonthlyIncome: '',
			budgets: [],
			budgetItems: [],
			activeBudget: false,
      		createBudget: false,
      		createItem: false,
      		budgetViewModal: false,
      		budgetToView: {
      			budgetName: '',
      			netMonthlyIncome: '',
      			budgetItems: [],
      			scenarios: [],
      			_id: ''
      		},
      		editBudgetModal: false,
      		budgetToEdit: {
      			budgetName: '',
      			netMonthlyIncome: '',
      			budgetItems: [],
      			scenarios: [],
      			_id: ''
      		}
		}
	}
	getBudget = async () => {
		const budget = await fetch(process.env.REACT_APP_URL + '/budget', {
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
					budgets: budgetArray,
					activeBudget: true,
					username: budgets.data[0].username
				})
			} else {
				this.setState({
					activeBudget:false
				})
			}
		})
	}
	openBudgetModal = () => {
		this.setState({
			createBudget: true
		})
	}
	closeBudgetModal = () => {
		this.setState({
			createBudget: false
		})
	}
	openBudget = async (budget) => {
		try {
			const selectedBudget = fetch(process.env.REACT_APP_URL + '/budget/' + budget._id, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			let parsedResponse = await selectedBudget.json()
			
			return parsedResponse
		} catch(err) {
			console.error(err)
		}
	}
	openAndEditBudget = (budget) => {
		this.setState({
			editBudgetModal: true,
			budgetToEdit: {
      			...budget
			}
		})
	}
	closeAndUpdateBudget = async (e) => {
		e.preventDefault()
		try {
			const parsedNetMonthlyIncome = parseInt(this.state.budgetToEdit.netMonthlyIncome)
			const editBudget = await fetch(process.env.REACT_APP_URL + '/budget/' + this.state.budgetToEdit._id + '/update', {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					budgetName: this.state.budgetToEdit.budgetName,
					netMonthlyIncome: parsedNetMonthlyIncome

				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			this.getBudget().then(budgets => {
				if(budgets.status === 200) {
					let budgetArray = budgets.data[0].budget
					this.setState({
						budgets: budgetArray,
						editBudgetModal: false
					})
				}
			})
		} catch(err) {
			console.error(err)
		}
	}
	closeEditBudgetModal = () => {
		this.setState({
			editBudgetModal: false
		})
	}
	budgetViewToggle = (budget) => {
		if(!this.state.budgetViewModal) {
			this.setState({
				budgetViewModal: true,
				budgetToView: {
					...budget
				}
			})
		} else {
			this.setState({
				budgetViewModal: false
			})
		}
	}
	newBudget = async (e) => {
		e.preventDefault();
		try {
			let incomeParsed = parseInt(this.state.netMonthlyIncome)
			const newBudget = await fetch(process.env.REACT_APP_URL + '/budget/new', {
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

		} catch(err) {
			console.error(err);
		}
	}
	deleteBudget = async (id) => {
		try {
			const deletedBudget = await fetch(process.env.REACT_APP_URL + '/budget/delete/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await deletedBudget.json()
			let budgets = parsedResponse.data.budget
			this.setState({
				budgets: budgets
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
  	handleBudgetEditChange = (e) => {
  		this.setState({
  			budgetToEdit: {
  				...this.state.budgetToEdit,
  				[e.currentTarget.name]: e.currentTarget.value
  			}
  		})
  	}
	render() {
		return (
			<div>
				<div className='welcomeCard'>
					<div className='welcomeContainer' >
					{this.state.activeBudget ? <span>Hello, {this.state.username}, ready to get started on a new budget?</span> : <span>Hello, {this.props.userInfo.username}, ready to continue working on your budget?</span>}
					</div>
				</div>
				<Budget userInfo={this.props.userInfo} budgetInfo={this.state.budgets} openBudget={this.budgetViewToggle} openAndEditBudget={this.openAndEditBudget} budgetViewModal={this.state.budgetViewModal} deleteBudget={this.deleteBudget} />
				{this.state.budgetViewModal ? <BudgetView budgetViewToggle={this.budgetViewToggle} budgetToView={this.state.budgetToView} budgetViewModal={this.state.budgetViewModal} /> : null}

				{this.state.editBudgetModal ? <EditBudgetModal closeAndUpdateBudget={this.closeAndUpdateBudget} handleBudgetEditChange={this.handleBudgetEditChange} editModal={this.state.editBudgetModal} closeEditBudgetModal={this.closeEditBudgetModal} budgetToEdit={this.state.budgetToEdit} /> : null}


				<br/>
				<br/>
				<br/>
				<button className='newBudget' onClick={this.openBudgetModal}>Create New Budget?</button>
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

export default BudgetContainer;