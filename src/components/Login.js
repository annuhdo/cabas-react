import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {app, base} from '../base';
import firebase from 'firebase/app';
import 'firebase/auth';

import { randomId } from '../helpers.js';
import logo from '../images/cabas_logo.svg';
import screenshot from '../images/screenshot.png';

import '../css/frontpage.css';
class Login extends Component {
    constructor() {
        super();
        this.authenticate = this.authenticate.bind(this);
        this.transitionToList = this.transitionToList.bind(this);
        this.startApp = this.startApp.bind(this);

        this.state = {
          uid: null
        }
    }

    componentWillMount() {
      // check if there is any user in localStorage
      const localStorageRef = localStorage.getItem(`uid`);

      if (localStorageRef) {
        // update our App component's order state
        this.setState({
            uid: JSON.parse(localStorageRef)
        });
      }
    }

    transitionToList(uid) {
        // check if the user was redirected from a shared id
        if (this.props.location.state) {
          const sharedId = this.props.location.state.sharedId;
          if (sharedId) {
            this.context.router.history.replace(`/lists/${sharedId}`);
          }
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

              this.context.router.history.replace(`/lists/${listId}`);
          }).catch(error => {
              console.error(error);
          });
        }


    }

      authenticate(providerText) {
        let provider;
        if (providerText === "google") {
          provider = new firebase.auth.GoogleAuthProvider();
        }
        app.auth().signInWithPopup(provider).then((result) => {
          let user = result.user;
          const uid = user.uid;
          // set current user into local storage
          localStorage.setItem(`uid`, JSON.stringify(uid));
          this.transitionToList(uid);
        }, (err) => {
          console.error(err);
        });
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
    router: PropTypes.object
}

export default Login;
