import React, { Component } from 'react';
import base from '../base';
import logo from '../images/cabas_logo.png';

class LeftNav extends Component {
  constructor() {
    super();

    this.logo =  this.logo.bind(this);
  }

  logo() {
    return (
        <p>hello</p>
    )
  }
  render() {
  	let photo = this.props.owner && this.props.owner.photo;
  	let name = this.props.owner && this.props.owner.name;
    return (
      <div className="nav">
        <img src={logo} />
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