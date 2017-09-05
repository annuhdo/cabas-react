import React, { Component } from 'react';
import { randomId } from '../helpers.js';

class RightNav extends Component {
    constructor() {
        super();
        this.renderLists = this.renderLists.bind(this);
        this.leaveList = this.leaveList.bind(this);
        this.redirectNewList = this.redirectNewList.bind(this);
    }

    leaveList(key) {
        this.props.leaveList(key);
    }

    transitionToList(key) {
        console.log("let's go", key);
        location.href = `/lists/${key}`;
    }

    decideLeave(key) {
        if (this.props.removableList) {
            this.leaveList(key);
        } else {
            this.transitionToList(key);
        }
    }

    renderLists(key) {
      const leaveButton = <div className="leave">Leave this list</div>
      let title = this.props.lists[key].listName || key;
      return (
            <li title={key} key={key} onClick={() => this.decideLeave(key)}>
            <div className="list-route" title={key} >{title}</div>
              {this.props.removableList ? leaveButton : null}
            </li>
      )
    }

    redirectNewList(e) {
      const newPath = randomId();
      location.href = `/lists/${newPath}`;
    }

    render() {
        let displayNone = {
            display: "none"
        }
        return (
            <div className="my-lists" style={this.props.showLists ? null : displayNone}>

              <div className="close-my-lists" onClick={this.props.closeLists}>Close</div>

              <h1>My Lists</h1>
              <div className="my-lists-top">
                <button className="edit-lists" name="removeList" onClick={this.props.toggleDisplay}>{this.props.removableList ? "Done" : "Edit"}</button>
                <button className="add-list" onClick={this.redirectNewList}>New</button>
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