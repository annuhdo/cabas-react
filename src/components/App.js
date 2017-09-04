import React, { Component } from 'react';

import LeftNav from './LeftNav';
import RightNav from './RightNav';
import EditModal from './EditModal';
import Item from './Item';
import Owners from './Owners';
import AddModal from './AddModal';
import ShareModal from './ShareModal';
import '../css/style.css';

import base from '../base';


class App extends Component {
    constructor() {
        super();

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleItemComplete = this.toggleItemComplete.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleShare = this.toggleShare.bind(this);

        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.refreshLists = this.refreshLists.bind(this);

        this.toggleRemovableList = this.toggleRemovableList.bind(this);
        this.leaveList = this.leaveList.bind(this);
        this.renderEditItem = this.renderEditItem.bind(this);
        this.closeEditItem = this.closeEditItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.closeLists = this.closeLists.bind(this);


        // get initial states
        this.state = {
            editableTitle: false,
            removableList: false,
            addItem: false,
            shareItem: false,
            showLists: false,
            title: {
                listName: "New List"
            },
            items: {},
            uid: null,
            owners: {},
            members: {},
            lists: {},
            showEditItem: "",
        }
    }

    componentWillMount() {
        // this runs right before <App> is rendered
        this.ref = base.syncState(`${this.props.params.listId}/items`, {
            context: this,
            state: 'items'
        });

        this.titleRef = base.syncState(`${this.props.params.listId}/title`, {
            context: this,
            state: 'title',
            default: 'New List',
        });

        this.ownersRef = base.syncState(`${this.props.params.listId}/owners`, {
            context: this,
            state: 'owners',
        });

        this.membersRef = base.syncState(`/members`, {
            context: this,
            state: 'members',
        });

        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user });
            }
        });


    }

    componentWillUnmount() {
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

        if (uid) {
            const path = `/members/${uid}`;

            this.listsRef = base.syncState(`${path}/lists`, {
                context: this,
                state: 'lists',
            });
        }

        lists[this.props.params.listId] = this.state.title;
        members.lists = lists;
        this.setState({
            members,
            lists,
            showLists: true
        });
    }

    closeLists() {
        this.setState({ showLists: false });
    }

    leaveList(listId) {

        // delete the list from the members
        const members = { ...this.state.members };
        const uid = this.state.uid;
        members[uid].lists[listId] = null;

        // sometimes user tries to leave the list they are currently on
        // so we can route them to another list (first of their lists)
        // or route them to homepage if they were never on any list
        if (listId === this.props.params.listId) {
            // get the first list from members' lists
            if (members[uid] && members[uid].lists) {
              const firstList = Object.keys(members[uid].lists)[0];
              this.context.router.transitionTo(`/lists/${firstList}`);
            }
            else {
              this.context.router.transitionTo('/');
            }
        }

        // remove member from list's owner
        base.database().ref(`${listId}/owners/${uid}`).set(null);

        // remove list from database altogether if no other owner
        base.fetch(`${listId}/owners`, {
            context: this,
            asArray: true
        }).then(data => {
            if (data.length === 0) {
                base.database().ref(`${listId}`).set(null);
            }
        }).catch(error => {
            console.log("Couldn't find owners.");
        })

        // remove the list from all lists
        base.database().ref(`/members/lists/${listId}`).set(null);

        this.setState({ members });

    }

    updateTitle(newTitle) {
        let title = { ...this.state.title };
        title.listName = newTitle;

        this.setState({
            title,
            editableTitle: !this.state.editableTitle
        })
    }

    addItem(item) {
        const items = { ...this.state.items };
        const timestamp = Date.now();

        items[`item-${timestamp}`] = item;

        this.setState({ items })
    }

    toggleEdit(e) {
        let editable = this.state.editableTitle;
        editable = !editable;

        this.setState({
            editableTitle: editable,
            addItem: false,
            removableList: false,
            shareItem: false
        })
    }

    toggleAdd(e) {
        let addable = this.state.addItem;
        addable = !addable;

        this.setState({
            addItem: addable,
            editableTitle: false,
            removableList: false,
            shareItem: false
        })
    }

    toggleShare(e) {
        let shareable = this.state.shareItem;
        shareable = !shareable;

        this.setState({
            shareItem: shareable,
            addItem: false,
            editableTitle: false,
            removableList: false
        })
    }

    toggleRemovableList(e) {
        let removableList = this.state.removableList;
        removableList = !removableList;

        this.setState({
            addItem: false,
            editableTitle: false,
            removableList,
            shareItem: false
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

  renderLogin() {
    return (
      <button className="login-btn" onClick={() => this.authenticate('github')}>Github</button>
    )
  }

  authenticate(provider) {
      base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
      base.unauth();
      this.setState({ uid: null });
      // user leaves local storage
      localStorage.setItem(`uid`, null);
      this.context.router.transitionTo('/');
  }

  authHandler(err, authData) {
      if (err) {
          console.error(err);
          return;
      }

      // //grab the list info
      // const listRef = base.database().ref(this.props.listId);

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
          members[uid].lists[this.props.params.listId] = this.state.title;
      } else {
          // member has never logged in before
          user.lists = {};
          user.lists[this.props.params.listId] = this.state.title;
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


  render() {

    // if (!this.state.uid) {
    //   // no one has logged in
    //   return <div>Loading...</div>
    // }

    return (
      <div className="dashboard">
      	<LeftNav
          listId={this.props.params.listId}
          owner={this.state.members[this.state.uid]}
          logout={this.logout}
          refreshLists={this.refreshLists}
          router={this.context.router}
        />

      	<div className="list">

      		<div className="list-top">
      			<div className="list-title">
      				<span className="title">{this.state.title.listName || this.props.params.listId}</span>

      				<button onClick={this.toggleEdit}>Edit Title</button>

      				<EditModal
      					editable={this.state.editableTitle}
      					currentTitle={this.state.title.listName}
                updateTitle={this.updateTitle}
                toggleEdit={this.toggleEdit}
                listId={this.props.params.listId}
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
              <button className="add" name="add" onClick={this.toggleAdd}>
                Add Item
              </button>

              <AddModal
                addable={this.state.addItem}
                addItem={this.addItem}
                owner={this.state.uid}
                toggleAdd={this.toggleAdd}
              />

            </div>

            <div className="share-section">
              <button className="share" name="share" onClick={this.toggleShare}>Share</button>

              <ShareModal
                shareable={this.state.shareItem}
                toggleShare={this.toggleShare}
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
        toggleRemovableList={this.toggleRemovableList}
        updateState={this.updateState}
        showLists={this.state.showLists}
        lists={this.state.lists}
        leaveList={this.leaveList}
        closeLists={this.closeLists} />

      </div>
    );
  }
}

App.contextTypes = {
    router: React.PropTypes.object
}

export default App;
