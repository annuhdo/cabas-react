import React, { Component } from 'react'
import styled from 'styled-components'
import {
	VerticalFlex
} from '../styles/'

const Container = styled('div') `
	${VerticalFlex}
	justify-content: center;
	font-size: 1.6em;
	margin-top: 130px;

	span {
		margin-left: 20px;
	}
`

const Header = styled('div') `
	font-size: 7em;
	font-weight: 600;
	letter-spacing: 0.6em;
	margin: 0 -0.6em 0.6em 0;
	text-shadow: 0 22px 54px #4A5080;
	color: white;
`

class NotFound extends Component {
	goBack(e) {
		e.preventDefault()
		window.history.go(-1)
	}
	render() {
		return (
			<Container>
				<Header>404</Header>
				This page does not exist :( <span onClick={this.goBack}>Go back?</span>
			</Container>
		)
	}
}

export default NotFound
