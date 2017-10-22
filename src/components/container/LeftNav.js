import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UserAvatar, Logo } from '../presentational'

const Nav = styled('nav') `
	background: white;
	width: 200px;
	order: 1;
	padding: 30px 30px 20px 30px;
	box-sizing: border-box;
	min-height: 100vh;

	img {
		width: 100%;
	}

	@media (max-width: 790px) {
		display: ${ props => props.mobile ? 'block' : 'none'};
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    z-index: 99;
	}
`

const Name = styled('span') `
	font-weight: 600;
	font-size: 1.1em;
	color: #6e7292;
`

const NavLinks = styled('ul') `
	margin-top: 40px;

	li {
		cursor: pointer;
		color: #6e7292;
	}

	li:hover {
		color: #808CEE;
	}
`

const Copyright = styled('div') `
	font-size: 0.9em;
	font-weight: 400;
	position: fixed;
	bottom: 20px;
`

class LeftNav extends Component {
  render() {
    const name = this.props.owner && this.props.owner.name
    return (
      <Nav mobile={this.props.openLeftNav}>
        <Logo />
        <UserAvatar size='80' margin='40px 0 10px 0' owner={this.props.owner} />
        <Name>{name}</Name>

        <NavLinks>
          <li onClick={() => this.props.refreshLists()}> My Lists </li>
          <li onClick={this.props.logout}> Sign Out </li>
        </NavLinks>

        <Copyright>
          Made by <a href="https://twitter.com/annuhdo">@annuhdo</a>
        </Copyright>
      </Nav>
    )
  }
}

LeftNav.propTypes = {
  listId: PropTypes.string,
  owner: PropTypes.object,
  logout: PropTypes.func,
  refreshList: PropTypes.func
}


export default LeftNav