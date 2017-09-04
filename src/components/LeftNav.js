import React, { Component } from 'react';
import logo from '../images/cabas_logo.png';

class LeftNav extends Component {
    render() {
    	let photo = this.props.owner && this.props.owner.photo;
    	let name = this.props.owner && this.props.owner.name;
      return (
        <div className="nav">
          <a href="/"> <img src={logo} alt="cabas logo" /> </a>
        	<div className="user">
        		<div className="user-img">
        			<img src={photo} alt={name} />
        		</div>
        		<span>{name}</span>
        	</div>

        	<div className="navigation">
  	      	<ul>
  	      		<li>
  	      			<a href="" onClick={this.props.refreshLists}>My Lists</a>
  	      		</li>
  	      		<li>
  	      			<a href="" onClick={this.props.logout}>Sign Out</a>
  	      		</li>
  	      	</ul>
        	</div>

        	<div className="copyright">
        		Made by <a href="https://twitter.com/annuhdo">@annuhdo</a>
        	</div>
        </div>
      );
    }
}


export default LeftNav;