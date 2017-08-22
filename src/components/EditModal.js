import React, { Component } from 'react';

class EditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.currentTitle
		};

		this.handleChange = this.handleChange.bind(this);
	}

	updateTitle(e) {
		e.preventDefault();

		const newTitle = this.title.value;

		if (newTitle !== '') {
			this.props.updateTitle(newTitle);
		}
		else {
			this.props.toggleEdit(e);
		}
	}

	handleChange(e) {
		this.setState( {
			title: e.target.value
		})
	}

	render() {
		let displayNone = {
	  		display: "none"
	  	}

	    return (
	    	<div className="edit-modal" style={this.props.editable ? null : displayNone}>

		      	<input type="text" value={this.state.title} onChange={this.handleChange} placeholder={this.props.currentTitle} ref={(input) => this.title = input} onKeyPress={(e) => e.key === 'Enter' ? this.updateTitle(e) : null} />

		      	<button name="done" className="done-btn" onClick={(e) => this.updateTitle(e)}>Done</button>
		      	<button name="cancel" className="cancel-btn" onClick={(e) => this.props.toggleEdit(e)}>Cancel</button>
	      	</div>

	    );
	}
}

export default EditModal;
