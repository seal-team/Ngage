import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'

export const name = user => {
  if (!user || !user.uid) return null
  return user.displayName || user.email
}

const WhoAmI = ({user, auth}) => {
  return (
    <div className="whoami">
      { /* <span className="whoami-user-name">Hello, {name(user)}</span> */ }
      { // If nobody is logged in, or the current user is anonymous,
        (!user.displayName || user.isAnonymous) ?
      // ...then show signin links...
      <Login auth={auth}/>
      /// ...otherwise, show a logout button.
      : <div className="whoami"><div className="columns"><div className="column text-center"><button className="logoutBtn"></button></div></div></div>}
  </div>
  )
}

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapState)(WhoAmI)
