import React from 'react';
import Modal from 'react-modal'

//*****************************************//
//                                         //
//    View of specifically selected        //
//    budget listed within the             //
//    BudgetContainer in order to edit     //
//    the selected budget. Conditional     //
//    rendering in BudgetContainer.        //
//                                         //
//*****************************************//

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

const EditBudget = (props) => {
	return (
		<Modal
			isOpen={props.editModal} 
			style={customStyles}
			onRequestClose={props.closeEditBudgetModal}>
          	<div>Create a new Budget!</div>
          	<br/>
          	<form onSubmit={props.closeAndUpdateBudget}>
          		<label>Budget Name</label>
          		<br/>
	            <input value={props.budgetToEdit.budgetName} name='budgetName' type='text' onChange={props.handleBudgetEditChange} />
	            <br/>
	            <label>Net Monthly Income</label>
	            <br/>
	            <input value={props.budgetToEdit.netMonthlyIncome} name='netMonthlyIncome' type='text' onChange={props.handleBudgetEditChange} />
          		<br/>
          		<button>Submit</button>
          	</form>
          	<button onClick={props.closeEditBudgetModal}>close</button>
        </Modal>
    )
}

export default EditBudget;