import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import WhoAmI from './WhoAmI'

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar nav-container">
        <div className="navbar-brand">
          <Link className="navbar-item logo-container" to='/'>
            <h1 className="logo-text">nGage</h1>
          </Link>
        </div>

        <div className="navbar-start navbar-item">
          <Link className="nav-text-item" to="/edit/new">
            New Presentation
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link is-active nav-profile" to="/profile">
              Username
            </Link>

            <div className="navbar-dropdown ">
              <Link className="navbar-item " to="/login">
                Login
              </Link>
              <Link className="navbar-item " to="/profile">
                Profile
              </Link>
              <Link onClick={
                this.props.logout
              } className="navbar-item " to="/">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
