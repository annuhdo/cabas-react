import React, { Component } from 'react';

class ShareModal extends Component {
    constructor() {
        super();
        this.copyUrl = this.copyUrl.bind(this);
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

		      	<input type="text" value={window.location.href} readOnly ref={(input) => this.uri = input} style={{cursor: 'text'}} />

		      	<button name="copy" className="done-btn" onClick={this.copyUrl}>Copy</button>
	      	</div>

	    );
	}
}

export default ShareModal;
