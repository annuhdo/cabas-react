import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UserAvatar, Logo } from './index'
import styled from 'styled-components'
import {
  HorizontalFlex
} from '../../styles/'

import hamburger from '../../images/cabas_hamburger.svg'

const Nav = styled('nav') `
  z-index: 11;
  position: fixed;
  width: 100%;
  background: white;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid #E2E5FB;
  padding: 10px 20px;
  height: 60px;
  top: 0;
  display: none;

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 790px) {
    ${HorizontalFlex}
    justify-content: space-between;
  }
`

const Hamburger = styled('div') `
  width: 28px;
  cursor: pointer;
`

class MobileNav extends Component {
  constructor() {
    super()
    this.open = this.open.bind(this)
  }
  open(nav) {
    if (nav === "right") {
      this.props.refreshLists()
    }
    this.props.openMobileNav(nav)
  }
  render() {
    return (
      <Nav>
        <div
          onClick={() => this.open("left")}>
          <UserAvatar
            size='40'
            margin='0 20px 0 0'
            owner={this.props.owner}
          />
        </div>

        <Logo width='80px' margin='0 20px 0 0' />

        <Hamburger onClick={() => this.open("right")}>
          <img src={hamburger} alt="hamburger" />
        </Hamburger>
      </Nav>
    )
  }
}

MobileNav.propTypes = {
  refreshLists: PropTypes.func,
  openMobileNav: PropTypes.func,
  owner: PropTypes.object
}

export default MobileNav