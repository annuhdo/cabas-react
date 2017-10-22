import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Logo from './Logo.js'
import styled from 'styled-components'
import {
    Button,
    VerticalFlex,
	HorizontalFlex
} from '../styles/'

import {app, base} from '../base'
import firebase from 'firebase/app'
import 'firebase/auth'

import { randomId } from '../helpers.js'
import screenshot from '../images/screenshot.png'

const Body = styled('div')`
    color: #1f1f1f;
    background: white;

    a {
        text-decoration: none;
        color: #4A5080;
    }
`

const Nav = styled('nav')`
    ${HorizontalFlex}
    height: 70px;
    box-shadow: 0px 2px 24px #E2E5FB;
    font-size: 1.4em;
    padding: 0 40px;
    justify-content: space-between;
    background: white;
    z-index: 10;

    @media (max-width: 700px) {
        background: white;
        padding: 0 20px;
    }
`

const Links = styled('div')`
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    a {
        margin-left: 20px;
    }
`

const Hero = styled('section')`
    ${HorizontalFlex}
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 90px;
    align-items: normal;
    background: transparent;

    @media (max-width: 700px) {
        margin-top: 100px;
        flex-direction: column;
        padding-top: 0;
        justify-content: normal;
    }
`

const HeroContent = styled('div')`
    ${VerticalFlex}
    width: 50%;
    float: left;
    padding-left: 40px;
    padding-right: 40px;
    max-width: 460px;
    align-items: flex-start;

    @media (max-width: 700px) {
        width: 100%;
        max-width: none;
        padding: 0 20px;
        position: relative;
        display: block;
    }
`

const PrimaryButton = styled('button')`
    ${Button}
    font-size: 2em;
    background: #808CEE;
    color: white;
    padding: 20px 40px;

    @media (max-width: 700px) {
        font-size: 1.6em;
        position: inline-block;
    }
`

const Header = styled('h1')`
    font-size: 4.2em;
    font-weight: bold;
    color: #4A5080;
    line-height: 1.2;
    margin-bottom: 20px;

    @media (max-width: 700px) {
        font-size: 3em;
        margin-bottom: 10px;
    }
`

const Subheader = styled('h2')`
    font-size: 2em;
    line-height: 1.3;
    margin-bottom: 30px;
    font-weight: 400;

    @media (max-width: 700px) {
        margin-bottom: 25px;
        font-size: 1.8em;
        width: 80%;
        line-height: 1.5;
    }
`

const Screenshot = styled('div')`
    float: right;
    position: relative;
    right: 0;
    height: auto;
    width: 50%;
    padding-left: 50px;

    img {
        height: 100%;
        box-shadow: 0px 12px 24px #E2E5FB;
    }

    @media (max-width: 700px) {
        width: auto;
        float: none;
        position: relative;
        margin-top: 30px;
        padding: 0;

        img {
            height: auto;
            width: 150%;
        }
    }
`

class Login extends Component {
    constructor() {
        super()
        this.authenticate = this.authenticate.bind(this)
        this.transitionToList = this.transitionToList.bind(this)
        this.startApp = this.startApp.bind(this)

        this.state = {
          uid: null
        }
    }

    componentWillMount() {
      // If the user has logged in before and has never logged out, 
      // find the user in the localStorage
      const localStorageRef = localStorage.getItem(`uid`)

      if (localStorageRef) {
        // update our App component's order state
        this.setState({
            uid: JSON.parse(localStorageRef)
        })
      }
    }

    transitionToList(uid) {
        // Sometimes the user was sent a link to a list but redirected to 
        // home page because they were not authenticated. So when we redirect
        // them to home page we pass along the listId so when they do
        // authenticate they can go back to that list.
        const location = this.props.location
        if (location && location.state && location.state.sharedId) {
          const sharedId = location.state.sharedId
          this.context.router.history.replace(`/lists/${sharedId}`)
        }
        else {
          // If they weren't redirected from a list just grab their
          // first list and redirect them to there.
          base.fetch(`allUsers/${uid}/lists`, {
              context: this,
          }).then(data => {
              let dataArr = Object.keys(data)
              let listId = null
              if (!dataArr || dataArr.length === 0) {
                  listId = randomId()
              }
              else {
                  listId = dataArr[0]
              }

              this.context.router.history.replace(`/lists/${listId}`)
          }).catch(error => {
              console.error(error)
          })
        }


    }

      authenticate(providerText) {
        // Let's authenticate through google because it's reliable :)
        let provider
        if (providerText === "google") {
          provider = new firebase.auth.GoogleAuthProvider()
        }
        app.auth().signInWithPopup(provider).then((result) => {
          let user = result.user
          const uid = user.uid
          // set current user into local storage
          localStorage.setItem(`uid`, JSON.stringify(uid))
          this.transitionToList(uid)
        }, (err) => {
          console.error(err)
        })
  }

  startApp(e) {
    e.preventDefault()

    if (this.state.uid !== null) {
      this.transitionToList(this.state.uid)
    }
    else {
      let provider = e.target.name
      this.authenticate(provider)
    }
  }


    render() {
	    return (
      <Body>
            <Nav>
            <Logo height='40px' />

                <Links>
                    <a href="https://twitter.com/annuhdo">@annuhdo</a>
                    <a href="https://github.com/annuhdo/cabas">Source</a>
                </Links>
            </Nav>
            <Hero>
                <HeroContent>
                <Header>
                        Collaborative, <br />
                        real-time todo list
                    </Header>
                    <Subheader>
                        Let your friends and family help with your todo list.
                    </Subheader>


        <PrimaryButton
            name="google"
            onClick={this.startApp}>
            Start App with Google
        </PrimaryButton>
                </HeroContent>

                                <Screenshot>
                    <img src={screenshot} alt="cabas screenshot" />
                </Screenshot>
                </Hero>
      </Body>

	    )
	}
}

Login.contextTypes = {
    router: PropTypes.object
}

export default Login
