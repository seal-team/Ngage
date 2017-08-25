import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import WhoAmI from './WhoAmI'
import NewPresentationModal from './NewPresentationModal'

export class Nav extends Component {
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
    const { userName, auth } = this.props
    return (
      <nav className="navbar nav-container">
        <div className="navbar-brand">
          <Link className="navbar-item logo-container" to='/'>
            <h1 className="logo-text">nGage</h1>
          </Link>
          <div className="navbar-burger">
          </div>
        </div>
          {this.state.showModal
            && <NewPresentationModal handleModal={this.handleModal} />
          }
        <div className='navbar-menu'>
          <div className="navbar-start navbar-item">
          </div>

          <div className="navbar-end navbar-item">
            <a className="navbar-item button is-outlined nav-button" onClick={this.handleModal}>
              New Presentation
            </a>
            
            <div className="navbar-item has-dropdown is-outlined is-hoverable nav-profile profile-dropdown">
              <Link className="navbar-link is-active" to="/profile">
                {userName}
              </Link>

              <div className="navbar-dropdown ">
                { !userName && <Link className="navbar-item " to="/">
                  Login
                </Link> }

                <Link className="navbar-item " to="/profile">
                  Profile
                </Link>

                {userName && <Link onClick={() => auth.signOut()}
                  className="navbar-item " to="/">
                  Logout
                </Link> }
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapState)(Nav)
