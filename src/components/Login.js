import React, { Component } from 'react';
import base from '../base';
import { randomId } from '../helpers.js';
import logo from '../images/cabas_logo.svg';
import screenshot from '../images/screenshot.png';

import '../css/frontpage.css';
class Login extends Component {
    constructor() {
        super();
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.transitionToList = this.transitionToList.bind(this);
        this.startApp = this.startApp.bind(this);

        this.state = {
          uid: null
        }
    }

    componentWillMount() {
      // check if there is any user in localStorage
      const localStorageRef = localStorage.getItem(`uid`);

      // update our App component's order state
      this.setState({
        uid: JSON.parse(localStorageRef)
      });

      window.onbeforeunload = function (e) {
        // reset sharedId
        sessionStorage.setItem(`sharedId`, null);
      }
    }

    componentWillUnmount() {
      // reset sharedId
      sessionStorage.setItem(`sharedId`, null);

      window.onbeforeunload = function (e) {
        // reset sharedId
        sessionStorage.setItem(`sharedId`, null);
      }
    }

    transitionToList(uid) {
        // check if the user was redirected from a shared id
        const sessionStorageRef = sessionStorage.getItem(`sharedId`);
        if (JSON.parse(sessionStorageRef) !== null) {
          const listId = JSON.parse(sessionStorageRef);
          // reset sharedId
          sessionStorage.setItem(`sharedId`, null);
          location.href = `/lists/${listId}`;
        }
        else {
          // fetch list
          base.fetch(`members/${uid}/lists`, {
              context: this,
          }).then(data => {
              let dataArr = Object.keys(data);
              let listId = null;
              if (dataArr.length === 0) {
                  listId = randomId();
              }
              else {
                  listId = dataArr[0];
              }

              location.href = `/lists/${listId}`;
          }).catch(error => {
              console.log("Couldn't find uid.");
          });
        }


    }

      authenticate(provider) {
      base.authWithOAuthPopup(provider, this.authHandler);
  }

    authHandler(err, authData) {
      if (err) {
          console.error(err);
          return;
      }

      // //grab the list info
      // const listRef = base.database().ref(this.props.listId);

      const uid = authData.user.uid;

      // set current user into local storage
      localStorage.setItem(`uid`, JSON.stringify(uid));

      this.transitionToList(uid);

  }

  startApp(e) {
    e.preventDefault();

    if (this.state.uid !== null) {
      this.transitionToList(this.state.uid);
    }
    else {
      let provider = e.target.name;
      this.authenticate(provider);
    }
  }


    render() {
	    return (
      <div className="body">

            <nav className="navi">
                <div className="logo">
                    <img src={logo} alt="cabas logo" />
                </div>

                <div className="links">
                    <a href="https://twitter.com/annuhdo">@annuhdo</a>
                    <a href="https://github.com/annuhdo/cabas">Github</a>
                </div>
            </nav>
            <div className="front">
                <div className="front-content">
                <h1 className="hero-txt">
                        Collaborative, <br />
                        real-time to-do list
                    </h1>
                    <div className="secondary-txt">
                        It's another to-do list, overdosed.
                    </div>


        <button name="google" className="login-btn" onClick={this.startApp}>Start App with Google</button>
                </div>

                                <div className="screenshot">
                    <img src={screenshot} alt="cabas screenshot" />
                </div>
                </div>
      </div>

	    );
	}
}

Login.contextTypes = {
    router: React.PropTypes.object
}

export default Login;
