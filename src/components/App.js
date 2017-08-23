import React, { Component } from 'react';

import LeftNav from './LeftNav';
import RightNav from './RightNav';
import EditModal from './EditModal';
import Item from './Item';
import Owners from './Owners';
import AddModal from './AddModal';

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

    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

		// get initial states
		this.state = {
			editableTitle: false,
      removableList: false,
      addItem: false,
      title: {
        listName: ""
      },
      items: {},
      uid: null,
      owners: {},
      members: {},
      lists: {},
    }
  }

    componentWillMount() {
      // this runs right before <App> is rendered
      this.ref = base.syncState(`${this.props.params.listId}/items`,{
        context: this,
        state: 'items'
      });

      this.titleRef = base.syncState(`${this.props.params.listId}/title`,{
        context: this,
        state: 'title',
        default: 'New List',
      });

      this.ownersRef = base.syncState(`${this.props.params.listId}/owners`,{
        context: this,
        state: 'owners',
      });

      this.membersRef = base.syncState(`/members`,{
        context: this,
        state: 'members',
      });

      // this.ownersRef = base.syncState(`/owners`,{
      //   context: this,
      //   state: 'owners',
      // });


    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });

    // this.refreshMembersInfo();
    this.updateOwner(this.state.members[this.state.uid]);


  }

    componentWillUnmount() {
      base.removeBinding(this.ref);
      base.removeBinding(this.titleRef);
      base.removeBinding(this.ownersRef);
      base.removeBinding(this.membersRef);
    }

  // refreshMembersInfo() {
  //        // grab the owners list
  //     const ownersRef = base.database().ref('owners');

  //       // query the firebase once to get the owners of this particular list
  //     ownersRef.once('value', (snapshot) => {
  //       const data = snapshot.val() || {};

  //       const members = {...this.state.members};

  //       Object.keys(members).map((key) => {
  //         members[key] = data[key];
  //       });

  //       this.setState({members})
  //   });
  // }

	updateTitle(newTitle) {
		let title = {...this.state.title};
		title.listName = newTitle;
		this.setState({
			title,
      editableTitle: !this.state.editableTitle
		})
	}

  addItem(item) {
    const items = {...this.state.items};
    const timestamp = Date.now();

    items[`item-${timestamp}`] = item;

    this.setState( {items} )
  }

  toggleEdit(e) {
    let editable = this.state.editableTitle;
    editable = !editable;

    this.setState({
      editableTitle : editable,
      addItem : false
    })
  }

  toggleAdd(e) {
    if (e.target.name === "add") {
      this.setState({
        addItem : true,
        editableTitle: false,
        removableList: false
      })
    }
    else {
      let addable = this.state.addItem;
      addable = !addable;

      this.setState({
        addItem : addable,
        editableTitle : false,
        removableList: false
      })
    }
  }

  toggleRemovableList(e) {
    let removableList = this.state.removableList;
    removableList = !removableList;

    this.setState({
      addItem : false,
      editableTitle : false,
      removableList
    })

  }

  deleteItem(key) {
    const items = {...this.state.items};
    items[key] = null;
    this.setState({items});
  }

  toggleItemComplete(key) {
    const items = {...this.state.items};
    items[key].completed = !items[key].completed;
    this.setState({items});
  }

  renderLogin() {
    return (
      <div>
        <span onClick={() => this.authenticate('github')}>Github</span>
        <span onClick={() => this.authenticate('google')}>Google</span>
        </div>
    )
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState( {uid: null});
  }

  updateOwner(user) {
    console.log(user);
    if (!user) {
      return;
    }
    const owners = {...this.state.owners};
    const members = {...this.state.members}; 
    const title = this.state.title.listName;
    const uid = this.state.uid;

    if (!members[uid]) {
      const newList = {};
      newList[this.props.params.listId] = {};
      newList[this.props.params.listId].title = title || "New List";
      user.lists = newList;
      members[uid] = user;
      this.setState({members});
    }
    else {
      let oldList = members[uid].lists;
      oldList[this.props.params.listId] = {};
      oldList[this.props.params.listId].title = title || "New List";
      this.setState({members});
    }

    owners[uid] = true;
    this.setState({owners});

    let lists = {...this.state.lists};
    lists = members[uid].lists;
    this.setState({lists});


  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }

    // //grab the list info
    // const listRef = base.database().ref(this.props.listId);

    let uid = authData.user.uid;

    this.setState({
      uid
    });

    let user = {
        name: authData.user.displayName,
        photo: authData.user.photoURL,
      };

    this.updateOwner(user);


  }


  render() {

    if (!this.state.uid) {
      // no one has logged in
      return <div className="dashboard">{this.renderLogin()}</div>;
    }


    return (
      <div className="dashboard">
      	<LeftNav
          listId={this.props.params.listId}
          owner={this.state.members[this.state.uid]}
          logout={this.logout}
        />

      	<div className="list">

      		<div className="list-top">
      			<div className="list-title">
      				<span className="title">{this.state.title && this.state.title.listName || "New List"}</span>

      				<button onClick={this.toggleEdit}>Edit Title</button>

      				<EditModal
      					editable={this.state.editableTitle}
      					currentTitle={this.state.title.listName}
                updateTitle={this.updateTitle}
                toggleEdit={this.toggleEdit}
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
              <button className="share">Share</button>
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
                toggleItemComplete={this.toggleItemComplete} />
            )}

          </div>

</div>


      	</div>

      	<RightNav
          removable={this.state.removableList}
          lists={this.state.lists || {}}
         />
      </div>
    );
  }
}

export default App;
