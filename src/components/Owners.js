import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Owners extends Component {
	render() {
      let displayNone = {
        display: "none"
      }

	    return (
        <div className="member" style={this.props.owner ? null : displayNone}>
          <div className="member-image">
            <img src={this.props.owner && this.props.owner.photo} alt={this.props.owner && this.props.owner.name} />
          </div>
            <div className="member-name">{this.props.owner && this.props.owner.name}</div>
        </div>

	    );
	}
}

Owners.contextTypes = {
  owner: PropTypes.object
}

export default Owners;
