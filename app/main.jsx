'use strict'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { render } from 'react-dom'
import WhoAmI from './components/WhoAmI'
import firebase from 'APP/fire'

import Routes from './routes'
import Nav from './components/Nav'

import '../public/index.scss'
// Get the auth API from Firebase.
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

// Further explanation:
//
// Whenever someone signs in or out (that's an "authStateChange"),
// firebase calls our callback with the user. If nobody is signed in,
// firebase calls us with null. Otherwise, we get a user object.
//
// This line of code thus keeps us logged in. If the user isn't signed
// in, we sign them in anonymously. This is useful, because when the user
// is signed in (even anonymously), they'll have a user id which you can
// access with auth.currentUser.uid, and you can use that id to create
// paths where you store their stuff. (Typically you'll put it somewhere
// like /users/${currentUser.uid}).
//
// Note that the user will still be momentarily null, so your components
// must be prepared to deal with that. This is unavoidable—with Firebase,
// the user will always be null for a moment when the app starts, before
// the authentication information is fetched.
//
// If you don't want this behavior, just remove the line above.

// Our root App component just renders a little frame with a nav
// and whatever children the router gave us.
const App = () => (
  <div className="app-container">
    {/* 
    <nav>
        WhoAmI takes a firebase auth API and renders either a
        greeting and a logout button, or sign in buttons, depending
        on if anyone's logged in 
      <WhoAmI auth={auth}/>
    </nav>
    */}
    <Nav />
    <Routes />
  </div>
)

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('main')
)
