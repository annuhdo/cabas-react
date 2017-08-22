import React, { Component } from 'react';

class AddModal extends Component {

	createItem(e) {
		e.preventDefault();

		if (this.title.value === '') {
			return;
		}

		const item = {
			title: this.title.value,
			detail: this.detail.value,
			owner: 'anna-uid',
			completed: false
		}

		this.props.toggleAdd(e);
		this.props.addItem(item);
		this.addForm.reset();
	}

	render() {
		let displayNone = {
	  		display: "none"
	  	}

	    return (
	    	<div className="add-modal" style={this.props.addable ? null : displayNone}>
	    		<span className="add-label">Add an Item</span>
	    		<form name="addForm" className="inputs" ref={(input) => this.addForm = input} onSubmit={(e) => this.createItem(e)} onKeyPress={(e) => e.key === 'Enter' ? this.createItem(e) : null}> 
	    			<input type="text" ref={(input) => this.title = input} placeholder="Item name" required={this.props.addable} />
	    			<input type="text" ref={(input) => this.detail = input} placeholder="Description (optional)" />

	    			<div className="action-btns">
	    				<button name="addItem" className="done-btn" type="submit">Add Item</button>
	    				<button name="cancel" className="cancel-btn" onClick={(e) => this.props.toggleAdd(e)}>Cancel</button>
	    			</div>
	    		</form>
	    	</div>

	    );
	}
}

export default AddModal;
