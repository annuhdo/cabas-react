import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UserAvatar } from './index'
import {
  Owner,
  VerticalFlex
} from '../../styles/'

const Container = styled('div')`
  ${VerticalFlex}
  margin-left: -25px;
  transition: all 0.2s;
  width: 40px;
  position: relative;
  box-sizing: border-box;

  ${Owner}:hover ~ div {
    display: block;
  }
`

const Name = styled('div')`
  display: none;
  background: #4a5080;
  color: white;
  font-size: 0.8em;
  padding: 8px 10px;
  border-radius: 3px;
  position: absolute;
  top: 100%;
  z-index: 10;

  &:before {
    content: ' ';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #4a5080;
    position: absolute;
    top: -5px;
    left: 0;
    right: 0;
    margin: auto;
  }
`

class Member extends Component {
	render() {
    let name = this.props.owner && this.props.owner.name

	    return (
        <Container>
          <UserAvatar size='40' owner={this.props.owner} />
           <Name>{name}</Name>
        </Container>

	    )
	}
}

Member.contextTypes = {
  owner: PropTypes.object
}

export default Member
