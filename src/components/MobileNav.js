import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../images/cabas_logo.svg';
import hamburger from '../images/cabas_hamburger.svg';

class MobileNav extends Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
  }
  open(e) {
    let nav = e.target.name;
    if (nav === "right") {
      this.props.refreshLists(e);
    }
    this.props.openMobileNav(`${e.target.name}`);
  }
    render() {
    	let photo = this.props.owner && this.props.owner.photo;
      return (
        <nav className="mobile-nav">
          <div className="user-img" onClick={this.open}>
            <img src={photo} alt="" name="left" />
          </div>

          <div className="logo">
            <img src={logo} alt=""/>
          </div>

          <div className="lists-menu" onClick={this.open}>
            <img src={hamburger} alt="" name="right" />
          </div>
        </nav>
      );
    }
}

MobileNav.propTypes = {
  refreshLists: PropTypes.func,
  openMobileNav: PropTypes.func,
  owner: PropTypes.object
}

export default MobileNav;