import React from 'react';
import Modal from 'react-modal'

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

const EditBudgetItemModal = (props) => {
	return (
		<Modal
			isOpen={props.editBudgetItemModal} 
			style={customStyles}
			onRequestClose={props.closeEditBudgetItemModal}>
          	<div>Edit Item</div>
          	<br/>
          	<form onSubmit={props.closeAndUpdateBudgetItem}>
          		<label>Item Name</label>
          		<br/>
	            <input value={props.budgetItemToEdit.itemName} name='itemName' type='text' onChange={props.handleBudgetItemEditChange} />
	            <br/>
	            <label>Amount</label>
	            <br/>
	            <input value={props.budgetItemToEdit.amount} name='amount' type='text' onChange={props.handleBudgetItemEditChange} />
          		<br/>
          		<button>Submit</button>
          	</form>
          	<button onClick={props.closeEditBudgetItemModal}>close</button>
        </Modal>
    )
}

export default EditBudgetItemModal;