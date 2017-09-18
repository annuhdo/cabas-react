import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.info
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
        let title = {...this.state.title}
        title.listName = e.target.value;
        this.setState({
            title
        })
    }

	render() {
		let displayNone = {
	  		display: "none"
	  	}

	    return (
	    	<div className="edit-modal" style={this.props.editable ? null : displayNone}>

		      	<input type="text" value={this.state.title.listName} onChange={this.handleChange} placeholder={this.props.info.listName} ref={(input) => this.title = input} onKeyPress={(e) => e.key === 'Enter' ? this.updateTitle(e) : null} />

		      	<button name="editTitle" className="done-btn" onClick={(e) => this.updateTitle(e)}>Done</button>
		      	<button name="editTitle" className="cancel-btn" onClick={(e) => this.props.toggleDisplay(e)}>Cancel</button>
	      	</div>

	    );
	}
}

EditModal.propTypes = {
    updateTitle: PropTypes.func,
    toggleDisplay: PropTypes.func,
    editable: PropTypes.bool,
    info: PropTypes.object
}

export default EditModal;
