import React, { Component } from 'react';

class RightNav extends Component {
  render() {
	let displayNone = {
		display: "none"
	}


    return (
      <div className="my-lists">
      	<h1>My Lists</h1>
      	<div className="my-lists-top">
      		<button className="edit-lists">Remove</button>
      		<button className="add-list">Add</button>
      	</div>

      	<ul className={this.props.removableList ? "owned-lists editable" : "owned-lists"}>

      		<li>{this.props.lists && this.props.lists["reg"].title}
      			{this.props.removableList ? <div className="leave">Leave this list</div> : null}
      		</li>
      	</ul>

      	{this.props.removableList ? <div className="footnote">You will be able to join the list again by accessing the URL of the list.</div> : null}
      	
      </div>
    );
  }
}

export default RightNav;