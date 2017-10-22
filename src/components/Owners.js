import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Member from "./Member"
import styled from 'styled-components'
import {
  HorizontalFlex
} from '../styles/'

const Container = styled('div') `
  ${HorizontalFlex}
  transition: all 0.2s;
  cursor: pointer;
  align-items: unset;
  justify-content: unset;

  &:hover > div {
    margin-left: 5px;
  }
`

class Owners extends Component {
  render() {
    return (
      <Container>
        {this.props.owners &&
          Object.keys(this.props.owners).map(uid => (
            <Member owner={this.props.allUsers[uid]} key={uid} />
          ))}
      </Container>

    )
  }
}

Owners.contextTypes = {
  owner: PropTypes.object
}

export default Owners
