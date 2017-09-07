import React, { Component } from 'react';

class NotFound extends Component {
	  goBack(e) {
		  e.preventDefault();
		  window.history.go(-1);
	  }
	  render() {
	  	let front = {
	  		alignItems: "center",
	  		margin: 0,
	  		padding: 0,
	  		flexDirection: "column"
	  	}

	  	let h1 = {
	  		fontSize: "13em",
	  		fontWeight: "bold",
	  		letterSpacing: "0.6em",
	  		margin: "0 -0.6em 0.6em 0",
	  		textShadow: "0 22px 54px #4A5080",
	  		color: "white"
	  	}

	  	let p = {
	  		fontSize: "1.6em"
	  	}

	  	let a = {
	  		margin: "0 0 0 20px"
	  	}

	    return (
	      <div className="front" style={front}>
	      	<h1 style={h1}>404</h1>
	      	<p style={p}>This page does not exist :( <a href="#" style={a} onClick={this.goBack}>Go back?</a></p>
	      </div>
	    );
	  }
}

export default NotFound;
