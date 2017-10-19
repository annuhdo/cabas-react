import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import styled from 'styled-components'
import {
    Button,
    Input,
    Modal,
	HorizontalFlex
} from '../styles/'

const ModalStyle = styled(Modal)`
	${HorizontalFlex}
	height: 50px;
	bottom: -60px;
	right: 0;
	display: ${ props => props.display};
	
	#copy-btn {
		${Button}
		margin-left: 10px
	}
`

class ShareModal extends Component {
    constructor() {
        super()
        this.onSuccess = this.onSuccess.bind(this)

        this.state = {
        	copied: false
        }
    }
    onSuccess() {
    	this.setState({
    		copied: true
    	})

    	setTimeout(() => {
    		this.setState({
    			copied: false
    		})
    	}, 1500)
    }
    copyUrl(e) {
        e.preventDefault()
        this.uri.select()
        document.execCommand('copy')
    }
	render() {
		const clipboard = new Clipboard('#copy-btn')
		clipboard.on('success', this.onSuccess)
	    return (
			<ModalStyle display={this.props.shareable ? 'flex' : 'none'}>
		      	<Input
				  type="text"
				  id="uri"
				  value={window.location.href}
				  readOnly
				  innerRef={(input) => this.uri = input}
				  style={{cursor: 'text'}} />
				  
		      	<button
				  id='copy-btn'
				  data-clipboard-text={ this.uri && this.uri.value }>
		      		{this.state.copied ? "Copied!" : "Copy"}
		      	</button>
	      	</ModalStyle>
	    )
	}
}

ShareModal.propTypes = {
	sharable: PropTypes.bool
}

export default ShareModal;
