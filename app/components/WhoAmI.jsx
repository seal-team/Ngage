import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'

export const name = user => {
  if (!user || !user.uid) return null
  return user.displayName || user.email
}

const WhoAmI = ({user, auth}) => {
  console.log('user', user, 'auth', auth)
  return (
    <div className="whoami">
      { /* <span className="whoami-user-name">Hello, {name(user)}</span> */ }
      { // If nobody is logged in, or the current user is anonymous,
        
        (!user || !user.uid) ?
      // ...then show signin links...
      <Login auth={auth}/>
      /// ...otherwise, show a logout button.
      : <div><span className="whoami-user-name">Hello, {name(user)}</span> <button className='logout' onClick={() => auth.signOut()}>logout</button></div>}
  </div>
)}

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapState)(WhoAmI)
