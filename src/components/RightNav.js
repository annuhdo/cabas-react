import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        this.props.router.history.push(`/lists/${key}`);
    }

    decideLeave(key) {
        if (this.props.removableList) {
            this.leaveList(key);
        } else {
            if (key === this.props.listId) {
              return;
            }
            this.transitionToList(key);
        }
    }

    renderLists(key) {
      const leaveButton = <div className="leave">Leave this list</div>
      return (
            <li className={key === this.props.listId ? "current" : null} title={key} key={key} onClick={() => this.decideLeave(key)}>
              <div className="list-route" title={key}>{this.props.lists[key].listName || key}</div>
                {this.props.removableList ? leaveButton : null}
            </li>
      )
    }

    redirectNewList(e) {
      const newPath = randomId();
      this.transitionToList(newPath);
    }

    render() {
        let displayNone = {
            display: "none"
        }
        return (
            <div className={this.props.openRightNav ? "my-lists mobile" : "my-lists"} style={this.props.showLists || this.props.openRightNav ? null : displayNone}>

              <div className="close-my-lists" onClick={this.props.closeLists}></div>

              <h1>My Lists</h1>
              <div className="my-lists-top">
                <button className="add-list" onClick={this.redirectNewList}>New</button>
                <button className="edit-lists" name="removeList" onClick={this.props.toggleDisplay}>{this.props.removableList ? "Done" : "Edit"}</button>
              </div>

              <ul className={this.props.removableList ? "owned-lists editable" : "owned-lists"}>
                {Object.keys(this.props.lists).map(this.renderLists)}
              </ul>

            {this.props.removableList ? <div className="footnote">You will be able to join the list again by accessing the URL of the list.</div> : null}
          </div>
        );
    }
}

RightNav.propTypes = {
  leaveList: PropTypes.func,
  router: PropTypes.object,
  removableList: PropTypes.bool,
  listId: PropTypes.string,
  openRightNav: PropTypes.bool,
  showLists: PropTypes.bool,
  closeLists: PropTypes.func,
}

export default RightNav;