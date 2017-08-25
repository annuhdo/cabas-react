import React, { Component } from 'react';

class Item extends Component {
  constructor() {
    super();

    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(e) {
    e.preventDefault();

    const newTitle = this.title.value;
    const newDetail = this.detail.value;

    console.log({newTitle, newDetail});


    if (newTitle !== '') {
      this.props.editItem(this.props.index, newTitle, newDetail);
    }

  }
	render() {
      let displayNone = {
        display: "none"
      }

      let photo = this.props.owner && this.props.owner.photo;
      let name = this.props.owner && this.props.owner.name;

	    return (
        <div>
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
              <button name="edit-item" onClick={(e) => this.props.renderEditItem(this.props.index)}>Edit</button>
            </div>
            <div className="remove">
              <button name="delete" onClick={(e) => this.props.deleteItem(this.props.index)}>Delete</button>
            </div>
          </div>

          <div className="edit-item-modal" style={this.props.showEditItem === this.props.index ? null : displayNone}>
            <span className="edit-label">Edit Item</span>
            <form className="inputs">
              <input type="text" defaultValue={this.props.item.title} placeholder={this.props.item.title} ref={(input) => this.title = input} onKeyPress={(e) => e.key === 'Enter' ? this.props.editItem(this.props.index, this.title.value, this.detail.value) : null} required />
              <input type="text" defaultValue={this.props.item.detail} placeholder={this.props.item.detail} ref={(input) => this.detail = input} onKeyPress={(e) => e.key === 'Enter' ? this.props.editItem(this.props.index, this.title.value, this.detail.value) : null} />
            </form>

            <div className="action-btns">
              <button className="edit-btn" onClick={(e) => this.props.editItem(this.props.index, this.title.value, this.detail.value)}>Edit Item</button>
              <button className="cancel-btn" onClick={(e) => this.props.closeEditItem(this.props.index)}>Cancel</button>
            </div>
          </div>
        </div>

	    );
	}
}

export default Item;
