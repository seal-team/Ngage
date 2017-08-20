import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import WhoAmI from './WhoAmI'
import NewPresentationModal from './NewPresentationModal'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  handleModal = (e) => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { userName } = this.props
    return (
      <nav className="navbar nav-container">
        <div className="navbar-brand">
          <Link className="navbar-item logo-container" to='/'>
            <h1 className="logo-text">nGage</h1>
          </Link>
        </div>
          {this.state.showModal
            && <NewPresentationModal handleModal={this.handleModal} />
          }
        <div className="navbar-start navbar-item">
          <button className="button is-primary" onClick={this.handleModal}>
            New Presentation
          </button>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end navbar-item has-dropdown is-hoverable profile-dropdown">
            <Link className="navbar-link is-active nav-profile" to="/profile">
              {userName}
            </Link>

            <div className="navbar-dropdown profile-dropdown">
              <Link className="navbar-item " to="/login">
                Login
              </Link>

              <Link className="navbar-item " to="/profile">
                Profile
              </Link>

              <Link onClick={this.props.logout}
                className="navbar-item " to="/">
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
