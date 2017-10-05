import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ClipboardButton from 'react-clipboard.js';

class ShareModal extends Component {
    constructor() {
        super();
        this.onSuccess = this.onSuccess.bind(this);

        this.state = {
        	copied: false
        }
    }
    onSuccess() {
    	this.setState({
    		copied: true
    	});

    	setTimeout(() => {
    		this.setState({
    			copied: false
    		})
    	}, 1500)
    }
    copyUrl(e) {
        e.preventDefault();
        this.uri.select();
        document.execCommand('copy');
    }
	render() {
		let displayNone = {
	  		display: "none"
	  	}


	    return (
	    	<div className="share-modal" style={this.props.shareable ? null : displayNone}>

		      	<input
				  type="text"
				  id="uri"
				  value={window.location.href}
				  readOnly
				  ref={(input) => this.uri = input}
				  style={{cursor: 'text'}} />
				  
		      	<ClipboardButton
				  data-clipboard-target="#uri"
				  onSuccess={this.onSuccess}>
		      		{this.state.copied ? "Copied!" : "Copy"}
		      	</ClipboardButton>
	      	</div>

	    );
	}
}

ShareModal.propTypes = {
	sharable: PropTypes.bool
}

export default ShareModal;
