import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/cabas_logo.svg'

const Wrapper = styled('div') `
  width: ${ props => props.width ? props.width : 'auto'};
  height: ${ props => props.height ? props.height : 'auto'};
  margin: ${ props => props.margin ? props.margin : 'auto'};

  img {
    width: 100%;
    height: auto;
  }
`

class Logo extends Component {
  render() {
    return (
      <Link to="/">
        <Wrapper
          width={this.props.width}
          height={this.props.height}
          margin={this.props.margin}
        >
          <img src={logo} alt="logo" />
        </Wrapper>
      </Link>
    )
  }
}

export default Logo