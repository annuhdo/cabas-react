import React, { Component } from 'react';
import base from '../base';

class LeftNav extends Component {
  render() {
  	let photo = this.props.owner && this.props.owner.photo;
  	let name = this.props.owner && this.props.owner.name;
    return (
      <div className="nav">
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