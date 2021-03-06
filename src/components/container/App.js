import React, { Component } from "react"
import PropTypes from "prop-types"
import styled, { injectGlobal } from 'styled-components'
import {
  HorizontalFlex
} from '../../styles/'

import { LeftNav, RightNav, Item } from './index'
import { MobileNav, MainTop } from '../presentational'

import { app, base } from "../../base"
import "firebase/auth"

injectGlobal`
body {
  font-size: 62.5%;
  font-family: Sans-Serif;
  font-weight: 400;
  margin: 0;
  padding: 0;
}
`;

const Body = styled('div') `
  color: #4A5080;
  background: rgb(238, 242, 245);
  min-height: 100vh;

  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
    margin-bottom: 15px;
  }

  a {
    text-decoration: none;
    color: #6E7292;
  }
  a:hover {
    color: #808CEE;
  }

  @media (max-width: 790px) {
    background: #FCFCFD;
  }
`

const Dashboard = styled('div') `
  display: grid;
  grid-template: 1fr / 200px 1fr ${ props => props.openRightNav };
  min-height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  /* align-items: flex-start; */
  font-size: 1.6em;

  @media (max-width: 790px) {
    width: 100%;
    overflow-x: hidden;
    margin-top: 60px;
    grid-template: 1fr / 1fr;
  }
`

const Main = styled('section') `
  min-height: 100vh;
  background: #FCFCFD;
  flex: 1;
  order: 2;
  padding: 30px 25px 10px 25px;
`

const ListItems = styled('section') `
  margin-top: 20px;
`

const Labels = styled('div') `
  ${HorizontalFlex}
  font-size: 0.95em;
  border-bottom: 2px solid #E2E5FB;
  padding: 0 3px 5px 3px;

  > div:nth-child(1) {
    flex: 1;
  }

  > div:nth-child(2) {
    width: 110px;
    text-align: center;
  }

  > div:nth-child(3) {
    width: 140px;
    text-align: center;
    margin-right: 0;
  }

  @media (max-width: 790px) {
    > div:nth-child(2) {
      width: 95px;
    }

    > div:nth-child(3) {
      width: 75px;
    }
  }
`

const Items = styled('div') `
  transition: all 0.2s;

  > div {
    position: relative;
  }
`

class App extends Component {
  constructor(props) {
    super(props)

    // Toggle the display of edit modals
    this.toggleDisplay = this.toggleDisplay.bind(this)

    // Toggle item completion
    this.toggleItemComplete = this.toggleItemComplete.bind(this)

    // Updates the title after user edits title
    this.updateTitle = this.updateTitle.bind(this)

    // User has the ability to leave a list if they would like!
    this.leaveList = this.leaveList.bind(this)

    // Close the right navigation which contains all the user's lists
    this.closeLists = this.closeLists.bind(this)

    // All the navs are closed on mobile so user may open them with this function!
    this.openMobileNav = this.openMobileNav.bind(this)

    // List items
    this.addItem = this.addItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    // If a user wants to edit the title/detail of an item in the list
    this.renderEditItem = this.renderEditItem.bind(this)

    // Close the edit modal for the list item
    this.closeEditItem = this.closeEditItem.bind(this)

    // Authentication
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)

    // Synchronize states to firebase
    this.refreshLists = this.refreshLists.bind(this)
    this.removeBindingFromFirebase = this.removeBindingFromFirebase.bind(this)
    this.synchronizeStatesWithFirebase = this.synchronizeStatesWithFirebase.bind(this)

    // Get initial states
    this.state = {
      editTitle: false,
      removableList: false,
      addItem: false,
      shareItem: false,
      openLeftNav: false,
      openRightNav: false,
      currentListInfo: {},
      items: {},
      uid: localStorage.getItem(`uid`) ? JSON.parse(localStorage.getItem(`uid`)) : null,
      currentListOwners: {},
      allUsers: {},
      lists: {},
      showEditItem: ""
    }
  }

  componentWillMount() {
    const listId = this.props.match.params.listId
    this.synchronizeStatesWithFirebase(listId)
  }

  componentWillReceiveProps(nextProps) {
    // User has navigated away from the current list
    if (nextProps.location !== this.props.location) {
      const newId = nextProps.match.params.listId
      const allUsers = { ...this.state.allUsers }
      const uid = this.state.uid
      const lists = { ...this.state.allUsers[this.state.uid].lists }

      // If this is a new list then append it to user's lists
      if (!(newId in lists)) {
        lists[newId] = { listName: "" }
        allUsers[uid].lists = lists
      }
      this.setState({
        lists
      })

      this.removeBindingFromFirebase()

      // Re-initialize all states to prep for synchronizing with newId
      this.setState({
        currentListInfo: lists[newId],
        items: {},
        currentListOwners: {},
        editTitle: false,
        addItem: false,
        shareItem: false,
        showEditItem: "",
        openLeftNav: false,
      })

      this.synchronizeStatesWithFirebase(newId)
    }
  }

  componentWillUnmount() {
    this.removeBindingFromFirebase()
  }

  componentDidMount() {
    // Check if the user has logged in before
    const localStorageRef = localStorage.getItem(`uid`)

    if (!localStorageRef || JSON.parse(localStorageRef) === null) {
      // User has never logged in before so let's redirect to the login page
      // Along the way, we should pass the current listId so user can redirect
      // back to the current list when they login
      this.context.router.history.replace("/", {
        sharedId: this.props.match.params.listId
      })
    }
  }

  synchronizeStatesWithFirebase(listId) {
    // reset currentListOwners list everytime we synchronize
    this.setState({ currentListOwners: {} })

    this.ref = base.syncState(`${listId}/items`, {
      context: this,
      state: "items"
    })

    this.currentListInfoRef = base.syncState(`${listId}/currentListInfo`, {
      context: this,
      state: "currentListInfo",
      default: "New List"
    })

    this.ownersRef = base.syncState(`${listId}/owners`, {
      context: this,
      state: "currentListOwners"
    })

    this.allUsersRef = base.syncState(`/allUsers`, {
      context: this,
      state: "allUsers"
    })

    this.listsRef = base.syncState(`/allUsers/${this.state.uid}/lists`, {
      context: this,
      state: "lists"
    })

    // Authenticate the user with info from database
    app.auth().onAuthStateChanged((user, error) => {
      if (user) {
        this.authHandler(null, { user })
      }
    })
  }

  removeBindingFromFirebase() {
    base.removeBinding(this.ref)
    base.removeBinding(this.currentListInfoRef)
    base.removeBinding(this.ownersRef)
    base.removeBinding(this.allUsersRef)
    base.removeBinding(this.listsRef)
  }

  refreshLists() {
    // Let's grab all the updated info of the user's lists
    // Ex: If a roommate changed the title of a list the user was not on
    // we should update the title so user sees it
    let allUsers = { ...this.state.allUsers }
    const uid = this.state.uid
    const lists = { ...this.state.allUsers[this.state.uid].lists }
    const currentListInfo = this.state.currentListInfo

    lists[this.props.match.params.listId] = currentListInfo
    allUsers[uid].lists = lists
    this.setState({
      allUsers,
      lists,
      openRightNav: true,
      openLeftNav: false
    })
  }

  closeLists() {
    this.setState({
      openRightNav: false
    })
  }

  leaveList(listId) {
    // Delete the list from the user's lists
    const allUsers = { ...this.state.allUsers }
    const uid = this.state.uid
    allUsers[uid].lists[listId] = null

    // Sometimes user tries to leave the list they are currently on
    // so we can route them to another list (first of their lists)
    // or route them to homepage if they were never on any list
    if (listId === this.props.match.params.listId) {
      // If user is leaving list they are on, redirect to their first list
      if (allUsers[uid] && allUsers[uid].lists) {
        const lists = Object.keys(allUsers[uid].lists)
        let redirectPath = `/lists/${lists[0]}`

        // If it turns out user is leaving the first list
        // then check if there is a second list to redirect to
        if (lists[0] === this.props.match.params.listId) {
          if (lists[1]) {
            redirectPath = `/lists/${lists[1]}`
          } else {
            redirectPath = "/"
          }
        }
        this.context.router.history.push(`${redirectPath}`)
      } else {
        this.context.router.history.push("/")
      }
    }

    // Remove the user from the list's respective owners
    base
      .update(`${listId}/owners`, {
        data: { [uid]: null }
      })
      .then(() => {
        // do nothing
      })
      .catch(err => {
        console.error(err)
      })

    // If the list has no owners after current user leaves, delete
    // the list from database altogether.
    base
      .fetch(`${listId}/owners`, {
        context: this,
        asArray: true
      })
      .then(data => {
        if (data.length === 0) {
          base
            .remove(`${listId}`)
            .then(() => {
              // do nothing
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      .catch(error => {
        console.log("Couldn't find owners.")
      })

    this.setState({ allUsers })
  }

  updateTitle(newTitle) {
    const currentListInfo = { ...this.state.currentListInfo }
    currentListInfo.listName = newTitle

    const lists = { ...this.state.lists }
    lists[this.props.match.params.listId].listName = newTitle

    this.setState({
      currentListInfo,
      lists,
      editTitle: !this.state.editTitle
    })
  }

  addItem(item) {
    const items = { ...this.state.items }
    const timestamp = Date.now()

    items[`item-${timestamp}`] = item

    this.setState({ items })
  }

  toggleDisplay(e) {
    let editTitle = false
    let addItem = false
    let removableList = false
    let shareItem = false

    let modal = e.target.name

    if (modal === "editTitle") {
      editTitle = !this.state.editTitle
    } else if (modal === "add") {
      addItem = !this.state.addItem
    } else if (modal === "share") {
      shareItem = !this.state.shareItem
    } else if (modal === "removeList") {
      removableList = !this.state.removableList
    }

    this.setState({
      editTitle,
      addItem,
      removableList,
      shareItem
    })
  }

  renderEditItem(key) {
    this.setState({ showEditItem: key })
  }

  closeEditItem() {
    this.setState({ showEditItem: "" })
  }

  editItem(key, currentListInfo, detail) {
    const items = { ...this.state.items }
    items[key].title = currentListInfo || ""
    items[key].detail = detail || ""

    this.setState({ items, showEditItem: "" })
  }

  deleteItem(key) {
    const items = {...this.state.items}
    const title = items[key].title
    let res = window.confirm(`Delete '${title}'?`)

    if (res) {
      const items = { ...this.state.items }
      items[key] = null
      this.setState({ items })
    }
  }

  toggleItemComplete(key) {
    const items = { ...this.state.items }
    items[key].completed = !items[key].completed
    this.setState({ items })
  }

  logout() {
    app
      .auth()
      .signOut()
      .then(() => {
        this.setState({ uid: null })
        // User leaves local storage
        localStorage.setItem(`uid`, null)
        // Pass current listID so when they login it will redirect to this page
        this.context.router.history.replace("/", {
          sharedId: this.props.match.params.listId
        })
      })
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err)
      return
    }

    // Let's grab data about the user
    const uid = authData.user.uid

    // We are interested in their name and photo in particular
    let user = {
      name: authData.user.displayName,
      photo: authData.user.photoURL
    }

    const currentListOwners = { ...this.state.currentListOwners }
    const allUsers = { ...this.state.allUsers }
    const lists = { ...this.state.lists }
    const listId = this.props.match.params.listId

    if (allUsers[uid]) {
      // User is logged in!
      // If the user is an owner of this list, let's update the list 
      // currentListInfo. Otherwise, this would just add the list to the 
      // allUsers' lists
      allUsers[uid].lists[listId] = this.state.currentListInfo
    } else {
      // User has never logged in before
      user.lists = {}
      user.lists[listId] = this.state.currentListInfo
      allUsers[uid] = user
    }

    // Regardless, add this list to the user's lists
    lists[listId] = {
      listName: ""
    }

    // Let the current user be one of the currentListOwners of this list
    currentListOwners[uid] = true

    this.setState({
      allUsers,
      currentListOwners,
      uid,
      lists
    })

    // Set current user's uid into local storage
    // so we don't have to reauthenticate the user when they revisit
    localStorage.setItem(`uid`, JSON.stringify(uid))
  }

  openMobileNav(nav) {
    let openLeftNav = this.state.openLeftNav
    let openRightNav = this.state.openRightNav
    if (nav === "left") {
      openLeftNav = !openLeftNav
      openRightNav = false
    } else if (nav === "right") {
      openLeftNav = false
      openRightNav = !openRightNav
    }

    this.setState({
      openLeftNav,
      openRightNav,
      editTitle: false,
      addItem: false,
      removableList: false,
      shareItem: false
    })
  }

  render() {
    return (
      <Body>
        <MobileNav
          owner={this.state.allUsers[this.state.uid]}
          refreshLists={this.refreshLists}
          openMobileNav={this.openMobileNav}
        />
        <Dashboard openRightNav={this.state.openRightNav ? '200px' : '0'}>
          <LeftNav
            listId={this.props.match.params.listId}
            owner={this.state.allUsers[this.state.uid]}
            logout={this.logout}
            refreshLists={this.refreshLists}
            router={this.context.router}
            openLeftNav={this.state.openLeftNav}
          />

          <Main>
            <MainTop
              {...this.props}
              title={this.state.currentListInfo.listName || this.props.match.params.listId}
              editable={this.state.editTitle}
              currentListInfo={this.state.currentListInfo}
              updateTitle={this.updateTitle}
              toggleDisplay={this.toggleDisplay}
              listId={this.props.match.params.listId}
              owners={this.state.currentListOwners}
              allUsers={this.state.allUsers}
              addable={this.state.addItem}
              addItem={this.addItem}
              owner={this.state.uid}
              shareable={this.state.shareItem}
            />

            <ListItems>
              <Labels>
                <div>Item</div>
                <div>Owner</div>
                <div>Actions</div>
              </Labels>

              <Items>
                {Object.keys(this.state.items).map(key => (
                  <Item
                    item={this.state.items[key]}
                    owner={
                      this.state.items[key] &&
                      this.state.allUsers[this.state.items[key].owner]
                    }
                    key={key}
                    index={key}
                    deleteItem={this.deleteItem}
                    toggleItemComplete={this.toggleItemComplete}
                    showEditItem={this.state.showEditItem}
                    renderEditItem={this.renderEditItem}
                    closeEditItem={this.closeEditItem}
                    editItem={this.editItem}
                  />
                ))}
              </Items>
            </ListItems>
          </Main>

          <RightNav
            removableList={this.state.removableList}
            toggleDisplay={this.toggleDisplay}
            updateState={this.updateState}
            lists={this.state.lists}
            leaveList={this.leaveList}
            closeLists={this.closeLists}
            listId={this.props.match.params.listId}
            openRightNav={this.state.openRightNav}
            router={this.context.router}
          />
        </Dashboard>
      </Body>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object,
  params: PropTypes.object
}

export default App
