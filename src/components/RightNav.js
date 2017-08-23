import React, { Component } from 'react';

class RightNav extends Component {
  constructor() {
    super();
    this.renderLists = this.renderLists.bind(this);
    this.leaveList = this.leaveList.bind(this);
  }

  leaveList(key) {
    this.props.leaveList(key);
  }

  renderLists(key) {
    const leaveButton = <div className="leave" onClick={() => this.props.leaveList(key)}>Leave this list</div>
    return (
          <li key={key}>{key}
            {this.props.removableList ? leaveButton : null}
          </li>
    )
  }

  render() {
    let displayNone = {
        display: "none"
      }
    return (
        <div className="my-lists" style={this.props.showLists ? null : displayNone}>
        <h1>My Lists</h1>
        <div className="my-lists-top">
          <button className="edit-lists" onClick={this.props.toggleRemovableList}>{this.props.removableList ? "Done" : "Edit"}</button>
          <button className="add-list">New</button>
        </div>

        
      <ul className={this.props.removableList ? "owned-lists editable" : "owned-lists"}>
        {Object.keys(this.props.lists).map(this.renderLists)}
      </ul>


        {this.props.removableList ? <div className="footnote">You will be able to join the list again by accessing the URL of the list.</div> : null}
        

      </div>
    );
  }
}

export default RightNav;