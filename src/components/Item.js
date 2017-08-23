import React, { Component } from 'react';

class Item extends Component {

	render() {
      let displayNone = {
        display: "none"
      }

      let photo = this.props.owner && this.props.owner.photo;
      let name = this.props.owner && this.props.owner.name;

	    return (
        <div className={this.props.item && this.props.item.completed ? 'list-row completed' : 'list-row'} style={this.props.item ? null : displayNone}>
          <div className="list-bullet" onClick={(e) => this.props.toggleItemComplete(this.props.index)}></div>
          <div className="item-info">
            <div className="item-title">{this.props.item && this.props.item.title}</div>
            <div className="item-detail" style={this.props.item && this.props.item.detail ? null : displayNone}>{this.props.item && this.props.item.detail}</div>
          </div>
          <div className="owner">
            <div className="owner-img">
              <img src={photo} alt={name} />
            </div>
          </div>

          <div className="edit">
            <button>Edit</button>
          </div>
          <div className="remove">
            <button name="delete" onClick={(e) => this.props.deleteItem(this.props.index)}>Delete</button>
          </div>
        </div>

	    );
	}
}

export default Item;
