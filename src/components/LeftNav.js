import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../images/cabas_logo.svg';

class LeftNav extends Component {
    render() {
    	let photo = this.props.owner && this.props.owner.photo;
    	let name = this.props.owner && this.props.owner.name;
      return (
        <div className={this.props.openLeftNav ? "nav mobile" : "nav"}>
          <a href="/"> <img src={logo} alt="cabas logo" /> </a>
        	<div className="user">
        		<div className="user-img">
        			<img src={photo} alt={name} />
        		</div>
        		<span>{name}</span>
        	</div>

        	<div className="navigation">
  	      	<ul>
  	      		<li onClick={this.props.refreshLists}> My Lists </li>
  	      		<li onClick={this.props.logout}> Sign Out </li>
  	      	</ul>
        	</div>

        	<div className="copyright">
        		Made by <a href="https://twitter.com/annuhdo">@annuhdo</a>
        	</div>
        </div>
      );
    }
}

LeftNav.propTypes = {
  listId: PropTypes.string,
  owner: PropTypes.object,
  logout: PropTypes.func,
  refreshList: PropTypes.func
}


export default LeftNav;