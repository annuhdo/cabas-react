import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LeftNav from './LeftNav';
import RightNav from './RightNav';
import EditModal from './EditModal';
import Item from './Item';
import Owners from './Owners';
import AddModal from './AddModal';
import ShareModal from './ShareModal';
import MobileNav from './MobileNav';
import '../css/style.css';

import {app, base} from '../base';
import 'firebase/auth';


class App extends Component {
    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleItemComplete = this.toggleItemComplete.bind(this);
        this.updateTitle = this.updateTitle.bind(this);

        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.refreshLists = this.refreshLists.bind(this);

        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.leaveList = this.leaveList.bind(this);
        this.renderEditItem = this.renderEditItem.bind(this);
        this.closeEditItem = this.closeEditItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.closeLists = this.closeLists.bind(this);
        this.openNav = this.openNav.bind(this);

        this.removeBinding = this.removeBinding.bind(this);
        this.synchronizeStates = this.synchronizeStates.bind(this);


        // get initial states
        this.state = {
            editableTitle: false,
            removableList: false,
            addItem: false,
            shareItem: false,
            showLists: false,
            title: {
                listName: ""
            },
            items: {},
            uid: JSON.parse(localStorage.getItem(`uid`)) || null,
            owners: {},
            members: {},
            lists: {},
            showEditItem: "",
            openLeftNav: false,
            openRightNav: false,
        }
    }

    componentWillMount() {
        let listId = this.props.match.params.listId;
        this.synchronizeStates(listId);
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.location !== this.props.location) {
        let currentId = this.props.match.params.listId;
        let newId = nextProps.match.params.listId;

        // if this is a new list then append it to user's lists
        const members = { ...this.state.members };
        const uid = this.state.uid;
        const lists = { ...this.state.members[this.state.uid].lists };
        if (!(newId in lists)) {
            lists[newId] = {listName: ""};
            members[uid].lists = lists;
        }
        this.setState({
          lists
        })

        // remove binding for the old list
        this.removeBinding();

        // re-initialize all states to prep for synchronizing with newId
        this.setState({
          title: lists[newId],
          items: {},
          owners: {},
          editableTitle: false,
          removableList: false,
          addItem: false,
          shareItem: false,
          showEditItem: "",
          openLeftNav: false,
        })

        this.synchronizeStates(newId);
       }

      //   if (currentId !== newId) {
      //     // directed to a new list
      //     this.removeBinding();
      //     this.synchronizeStates(newId);

      //     let members = { ...this.state.members };
      //     const uid = this.state.uid;
      //     const lists = { ...this.state.members[this.state.uid].lists };

      //     if (!(newId in lists)) {
      //       lists[newId] = {listName: ""};
      //       members[uid].lists = lists;
      //     }
      //     console.log(lists);
      //     this.setState({
      //       openRightNav: false,
      //       lists: lists,
      //     });

      //   }
      // }
    }

    componentWillUnmount() {
        this.removeBinding();
    }

    componentDidMount() {
      // check if there is any user in localStorage
      const localStorageRef = localStorage.getItem(`uid`);

      if (JSON.parse(localStorageRef) === null) {
        // let's pass a shared ID so we can redirect user when they login
        this.context.router.history.replace('/', {sharedId: this.props.match.params.listId});
      }
    }

    synchronizeStates(listId) {
      // reset owners list everytime we synchronize
      this.setState({owners: {}});
      this.ref = base.syncState(`${listId}/items`, {
          context: this,
          state: 'items'
      });

      this.titleRef = base.syncState(`${listId}/title`, {
          context: this,
          state: 'title',
          default: 'New List',
      });

      this.ownersRef = base.syncState(`${listId}/owners`, {
          context: this,
          state: 'owners',
      });

      this.membersRef = base.syncState(`/members`, {
          context: this,
          state: 'members',
      });

      this.listsRef = base.syncState(`/members/${this.state.uid}/lists`, {
              context: this,
              state: 'lists',
      });

      app.auth().onAuthStateChanged((user, error) => {
          if (user) {
              this.authHandler(null, { user });
          }
      });
    }

    removeBinding() {
        base.removeBinding(this.ref);
        base.removeBinding(this.titleRef);
        base.removeBinding(this.ownersRef);
        base.removeBinding(this.membersRef);
        base.removeBinding(this.listsRef);
    }

    refreshLists(e) {
        e.preventDefault();

        let members = { ...this.state.members };
        const uid = this.state.uid;
        const lists = { ...this.state.members[this.state.uid].lists };
        const title = this.state.title;

        lists[this.props.match.params.listId] = title;
        members[uid].lists = lists;
        this.setState({
            members,
            lists,
            showLists: true
        });
    }

    closeLists() {
        this.setState({
          showLists: false,
          openRightNav: false
        });
    }

    leaveList(listId) {

        // delete the list from the members
        const members = { ...this.state.members };
        const uid = this.state.uid;
        members[uid].lists[listId] = null;

        // sometimes user tries to leave the list they are currently on
        // so we can route them to another list (first of their lists)
        // or route them to homepage if they were never on any list
        if (listId === this.props.match.params.listId) {
            // if user is leaving list they are on, redirect to their first list
            if (members[uid] && members[uid].lists) {
              const lists = Object.keys(members[uid].lists);
              let redirectPath = `/lists/${lists[0]}`;

              // if it turns out user is leaving the first list
              // check if there is a second list to redirect to
              if (lists[0] === this.props.match.params.listId) {
                if (lists[1]) {
                  redirectPath = `/lists/${lists[1]}`;
                }
                else {
                  redirectPath = '/';
                }
              }
              this.context.router.history.push(`${redirectPath}`);
            }
            else {
              this.context.router.history.push('/');
            }
        }

        // remove member from list's owner
        base.update(`${listId}/owners`, {
          data: {[uid]: null}
        }).then(() => {
          // do nothing
        }).catch(err => {
          console.error(err);
        });

        // remove list from database altogether if no other owner
        base.fetch(`${listId}/owners`, {
            context: this,
            asArray: true
        }).then(data => {
            if (data.length === 0) {
                base.remove(`${listId}`).then(() => {
                  // do nothing
                }).catch(err => {
                  console.error(err);
                })
            }
        }).catch(error => {
            console.log("Couldn't find owners.");
        })

        this.setState({ members });

    }

    updateTitle(newTitle) {
        const title = { ...this.state.title };
        title.listName = newTitle;

        const lists = {...this.state.lists};
        lists[this.props.match.params.listId].listName = newTitle;

        this.setState({
            title,
            lists,
            editableTitle: !this.state.editableTitle
        })
    }

    addItem(item) {
        const items = { ...this.state.items };
        const timestamp = Date.now();

        items[`item-${timestamp}`] = item;

        this.setState({ items })
    }

    toggleDisplay(e) {
      let editableTitle = this.state.editableTitle;
      let addItem = this.state.addItem;
      let removableList = this.state.removableList;
      let shareItem = this.state.shareItem;

      let modal = e.target.name;

      if (modal === "editTitle") {
        editableTitle = !editableTitle;
        addItem = false;
        removableList = false;
        shareItem = false;
      }
      else if (modal === "add") {
        editableTitle = false;
        addItem = !addItem;
        removableList = false;
        shareItem = false;
      }
      else if (modal === "share") {
        editableTitle = false;
        addItem = false;
        removableList = false;
        shareItem = !shareItem;
      }
      else if (modal === "removeList") {
        editableTitle = false;
        addItem = false;
        removableList = !removableList;
        shareItem = false;
      }

      this.setState({
        editableTitle,
        addItem,
        removableList,
        shareItem,
      })
    }

    renderEditItem(key) {
        this.setState({ showEditItem: key });
    }

    closeEditItem() {
        this.setState({ showEditItem: "" });
    }

    editItem(key, title, detail) {
        const items = { ...this.state.items };
        items[key].title = title || "";
        items[key].detail = detail || "";

        this.setState({ items, showEditItem: "" });
    }

    deleteItem(key) {
        const items = { ...this.state.items };
        items[key] = null;
        this.setState({ items });
    }

    toggleItemComplete(key) {
        const items = { ...this.state.items };
        items[key].completed = !items[key].completed;
        this.setState({ items });
    }

    logout() {
        app.auth().signOut().then(() => {
          this.setState({ uid: null });
          // user leaves local storage
          localStorage.setItem(`uid`, null);
          // pass current list ID so when they login it will redirect to this page
          this.context.router.history.replace('/', {sharedId: this.props.match.params.listId});
        });
    }

    authHandler(err, authData) {
        if (err) {
            console.error(err);
            return;
        }

        const uid = authData.user.uid;
        const owners = { ...this.state.owners };

        let user = {
            name: authData.user.displayName,
            photo: authData.user.photoURL,
        };

        let members = { ...this.state.members };
        // check if user exists in members
        if (members[uid]) {
            // add current listId to their lists
            members[uid].lists[this.props.match.params.listId] = this.state.title;
        } else {
            // member has never logged in before
            user.lists = {};
            user.lists[this.props.match.params.listId] = this.state.title;
            members[uid] = user;
        }

        owners[uid] = true;

        // regardless update members state
        this.setState({
            members,
            owners,
            uid
        });

        // set current user into local storage
        localStorage.setItem(`uid`, JSON.stringify(uid));
    }

    openNav(nav) {
      if (nav === "left") {
        let openLeftNav = this.state.openLeftNav;
        openLeftNav = !openLeftNav;
        this.setState({
          openLeftNav,
          openRightNav: false,
          editableTitle: false,
          addItem: false,
          removableList: false,
          shareItem: false
        });
      }
      else if (nav === "right") {
        let openRightNav = this.state.openRightNav;
        openRightNav = !openRightNav;
        this.setState({
          openRightNav,
          openLeftNav: false,
          editableTitle: false,
          addItem: false,
          removableList: false,
          shareItem: false
        });
      }
    }


  render() {
    return (
      <div>
        <MobileNav
          owner={this.state.members[this.state.uid]}
          refreshLists={this.refreshLists}
          openNav={this.openNav}
        />
        <div className="dashboard">
        	<LeftNav
            listId={this.props.match.params.listId}
            owner={this.state.members[this.state.uid]}
            logout={this.logout}
            refreshLists={this.refreshLists}
            router={this.context.router}
            openLeftNav={this.state.openLeftNav}
          />

        	<div className="list">
            <div className="list-top">
              <div className="list-title">
                <span className="title">{this.state.title.listName || this.props.match.params.listId}</span>
                <button name="editTitle" onClick={this.toggleDisplay}>Edit Title</button>

                <EditModal
                  editable={this.state.editableTitle}
                  currentTitle={this.state.title}
                  updateTitle={this.updateTitle}
                  toggleDisplay={this.toggleDisplay}
                  listId={this.props.match.params.listId}
                />
        			</div>

              <div className="members">
                {this.state.owners &&
                  Object.keys(this.state.owners).map((uid) =>
                    <Owners owner={this.state.members[uid]} key={uid} />
                  )
                }
              </div>
            </div>

            <div className="add-share">
              <div className="add-section">
                <button className="add" name="add" onClick={this.toggleDisplay}>
                  Add Item
                </button>

                <AddModal
                  addable={this.state.addItem}
                  addItem={this.addItem}
                  owner={this.state.uid}
                  toggleDisplay={this.toggleDisplay}
                />
              </div>

              <div className="share-section">
                <button className="share" name="share" onClick={this.toggleDisplay}>Share</button>

                <ShareModal
                  shareable={this.state.shareItem}
                  toggleDisplay={this.toggleDisplay}
                />
              </div>
            </div>

            <div className="list-table">
              <div className="list-labels">
                <div className="item-col">Item</div>
                <div className="owner-col">Owner</div>
                <div className="remove-col">Actions</div>
              </div>

              <div className="list-item">
                {Object
                  .keys(this.state.items)
                  .map((key) =>
                    <Item
                    item={this.state.items[key]}
                    owner={this.state.items[key] && this.state.members[this.state.items[key].owner]}
                    key={key}
                    index={key}
                    deleteItem={this.deleteItem}
                    toggleItemComplete={this.toggleItemComplete}
                    showEditItem={this.state.showEditItem}
                    renderEditItem={this.renderEditItem}
                    closeEditItem={this.closeEditItem}
                    editItem={this.editItem}
                    />
                )}
              </div>
            </div>
        	</div>

          <RightNav
          removableList={this.state.removableList}
          toggleDisplay={this.toggleDisplay}
          updateState={this.updateState}
          showLists={this.state.showLists}
          lists={this.state.lists}
          leaveList={this.leaveList}
          closeLists={this.closeLists}
          listId={this.props.match.params.listId}
          openRightNav={this.state.openRightNav}
          router={this.context.router}
          />

        </div>
      </div>
    );
  }
}

App.contextTypes = {
    router: PropTypes.object,
    params: PropTypes.object
}

export default App;
