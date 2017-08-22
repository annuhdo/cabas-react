import React, { Component } from 'react';

import LeftNav from './LeftNav';
import RightNav from './RightNav';
import EditModal from './EditModal';
import Item from './Item';
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

		// get initial states
		this.state = {
			editableTitle: false,
      addItem: false,
      id: 'Ann-sho-90e0bc6e-713a',
      currentUser: 'anna-uid',
      title: '',
      items: {},
      owners: {
        'anna-uid': true,
        'tony-uid': true
			},
      users: {
        'anna-uid': {
          name: 'Anna',
          image: 'https://cdn.dribbble.com/users/1370654/avatars/small/b5cc39a6cef2c6730c3e31a8fbfa2330.png?1500408665',
        },
        'tony-uid': {
          name: 'Tony',
          image: 'https://cdn.dribbble.com/users/1370654/avatars/small/b5cc39a6cef2c6730c3e31a8fbfa2330.png?1500408665',
        }
      }
		}
	}

    componentWillMount() {
      // this runs right before <App> is rendered
      this.listRef = base.syncState(`${this.state.id}/items`,{
        context: this,
        state: 'items'
      });

      this.titleRef = base.syncState(`${this.state.id}/title`,{
        context: this,
        state: 'title',
      });
  }

    componentWillUnmount() {
      base.removeBinding(this.listRef);
      base.removeBinding(this.titleRef);
    }

	updateTitle(newTitle) {
		let title = {...this.state.title};
		title = newTitle;
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
        editableTitle: false
      })
    }
    else {
      let addable = this.state.addItem;
      addable = !addable;

      this.setState({
        addItem : addable,
        editableTitle : false
      })
    }
  }

  deleteItem(key) {
    const items = {...this.state.items};
    items[key] = null;
    delete items[key];
    this.setState({items});
  }

  toggleItemComplete(key) {
    const items = {...this.state.items};
    items[key].completed = !items[key].completed;
    this.setState({items});
  }


  render() {

    return (
      <div className="dashboard">
      	<LeftNav />

      	<div className="list">

      		<div className="list-top">
      			<div className="list-title">
      				<span className="title">{this.state.title}</span>

      				<button onClick={this.toggleEdit}>Edit Title</button>

      				<EditModal
      					editable={this.state.editableTitle}
      					currentTitle={this.state.title}
                updateTitle={this.updateTitle}
                toggleEdit={this.toggleEdit}
      					/>

      			</div>

            <div className="members">


              <div className="member">
                <div className="member-image">
                  <img src="https://cdn.dribbble.com/users/1370654/avatars/small/b5cc39a6cef2c6730c3e31a8fbfa2330.png?1500408665" alt="Anna" />
                  <div className="member-name">Anna</div>
                </div>
              </div>

              <div className="member">
                <div className="member-image">
                  <img src="https://cdn.dribbble.com/users/1370654/avatars/small/b5cc39a6cef2c6730c3e31a8fbfa2330.png?1500408665" alt="Anna" />
                  <div className="member-name">Anna</div>
                </div>
              </div>
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
                key={key}
                index={key}
                deleteItem={this.deleteItem}
                toggleItemComplete={this.toggleItemComplete} />
            )}

          </div>

</div>


      	</div>

      	<RightNav />
      </div>
    );
  }
}

export default App;
