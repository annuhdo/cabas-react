import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'
import { Modal, ModalLabel } from '../styles/Modal'
import { VerticalFlex, HorizontalFlex } from '../styles/Flex'

const ModalStyle = styled(Modal)`
    height: 50px;
    bottom: -60px;
    ${HorizontalFlex}
`

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.currentListInfo.listName || ''
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
            <ModalStyle
                name="editForm"
                style={this.props.editable ? null : displayNone}
                onSubmit={(e) => this.updateTitle(e)}
                onKeyPress={(e) => e.key === 'Enter' ? this.updateTitle(e) : null}> 

		      	<input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder={this.props.currentListInfo.listName || ""}
                  ref={(input) => this.title = input} />

		      	<button
                  name="editTitle"
                  className="done-btn"
                  type="submit">
                    Done
                </button>
		      	<button
                  name="editTitle"
                  className="cancel-btn"
                  onClick={(e) => this.props.toggleDisplay(e)}>
                    Cancel
                </button>
            </ModalStyle>
	    );
	}
}

EditModal.propTypes = {
    updateTitle: PropTypes.func,
    toggleDisplay: PropTypes.func,
    editable: PropTypes.bool,
    currentListInfo: PropTypes.object
}

export default EditModal;
