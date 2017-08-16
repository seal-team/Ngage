import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

const google = new firebase.auth.GoogleAuthProvider()

// Firebase has several built in auth providers:
// const facebook = new firebase.auth.FacebookAuthProvider()
// const twitter = new firebase.auth.TwitterAuthProvider()
// const github = new firebase.auth.GithubAuthProvider()
// // This last one is the email and password login we all know and
// // vaguely tolerate:
// const email = new firebase.auth.EmailAuthProvider()

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

// signInWithPopup will try to open a login popup, and if it's blocked, it'll
// redirect. If you prefer, you can signInWithRedirect, which always
// redirects.

class Login extends Component {
  constructor(props) {
    super(props)
    this.signInAndRedirect = this.signInAndRedirect.bind(this)
  }

  signInAndRedirect() {
    this.props.auth.signInWithPopup(google)
      .then(() => this.props.history.push('/profile'))
  }

  render() {
    return (   
      <div className="columns">
        <div className="column text-center">
          <button className='loginBtn loginBtn--google'
            onClick={() => this.signInAndRedirect()}>Login with Google</button>
        </div>
      </div>
    )
  }
}

export default Login
