import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logo from '../images/cabas_logo.svg'
import hamburger from '../images/cabas_hamburger.svg'
import styled from 'styled-components'
import {
  Owner,
  HorizontalFlex
} from '../styles/'

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

const Logo = styled('div') `
  width: ${ props => props.width};
  margin: ${ props => props.margin};

  img {
    width: 100%;
    height: auto;
  }
`

const Hamburger = styled('div') `
  width: 28px;
  cursor: pointer;
`

class MobileNav extends Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
  }
  open(nav) {
    if (nav === "right") {
      this.props.refreshLists();
    }
    this.props.openMobileNav(nav);
  }
  render() {
    let photo = this.props.owner && this.props.owner.photo;
    let name = this.props.owner && this.props.owner.name;
    return (
      <Nav>
        <Owner size='40' circular margin='0 20px 0 0' onClick={() => this.open("left")}>
          <img src={photo} alt={name} />
        </Owner>

        <Link to="/">
          <Logo width='80px' margin='0 20px 0 0'>
            <img src={logo} alt="cabas" />
          </Logo>
        </Link>

        <Hamburger onClick={() => this.open("right")}>
            <img src={hamburger} alt="hamburger" />
        </Hamburger>
      </Nav>
    );
  }
}

MobileNav.propTypes = {
  refreshLists: PropTypes.func,
  openMobileNav: PropTypes.func,
  owner: PropTypes.object
}

export default MobileNav;