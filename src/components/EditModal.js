import React, { Component } from 'react';

class EditModal extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    updateTitle(e) {
        e.preventDefault();

        const newTitle = this.title.value;

        if (newTitle !== '') {
            this.props.updateTitle(newTitle);
        } else {
            this.props.toggleDisplay(e);
        }
    }

    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

	render() {
		let displayNone = {
	  		display: "none"
	  	}

	    return (
	    	<div className="edit-modal" style={this.props.editable ? null : displayNone}>

		      	<input type="text" value={this.state.title} onChange={this.handleChange} placeholder={this.props.currentTitle.listName} ref={(input) => this.title = input} onKeyPress={(e) => e.key === 'Enter' ? this.updateTitle(e) : null} />

		      	<button name="editTitle" className="done-btn" onClick={(e) => this.updateTitle(e)}>Done</button>
		      	<button name="editTitle" className="cancel-btn" onClick={(e) => this.props.toggleDisplay(e)}>Cancel</button>
	      	</div>

	    );
	}
}

EditModal.contextTypes = {
    updateTitle: React.PropTypes.func.isRequired,
    toggleDisplay: React.PropTypes.func.isRequired,
    editable: React.PropTypes.bool.isRequired,
    currentTitle: React.PropTypes.object.isRequired
}

export default EditModal;
