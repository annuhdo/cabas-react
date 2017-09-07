import React, { Component } from 'react';

class AddModal extends Component {

    createItem(e) {
        e.preventDefault();

        if (this.title.value === '') {
            return;
        }
        const newTitle = this.title.value || "";
        const newDetail = this.detail.value || "";

        const item = {
            title: newTitle,
            detail: newDetail,
            owner: this.props.owner,
            completed: false
        }

        this.props.toggleDisplay(e);
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
	    		<form name="add" className="inputs" ref={(input) => this.addForm = input} onSubmit={(e) => this.createItem(e)} onKeyPress={(e) => e.key === 'Enter' ? this.createItem(e) : null}> 
	    			<input type="text" ref={(input) => this.title = input} placeholder="Item name" required={this.props.addable} />
	    			<input type="text" ref={(input) => this.detail = input} placeholder="Description (optional)" />

	    			<div className="action-btns">
	    				<button name="addItem" className="done-btn" type="submit">Add Item</button>
	    				<button name="add" className="cancel-btn" onClick={(e) => this.props.toggleDisplay(e)}>Cancel</button>
	    			</div>
	    		</form>
	    	</div>

	    );
	}
}

AddModal.contextTypes = {
    owner: React.PropTypes.object.isRequired,
    toggleDisplay: React.PropTypes.func.isRequired,
    addItem: React.PropTypes.func.isRequired,
    addable: React.PropTypes.bool.isRequired
}

export default AddModal;
