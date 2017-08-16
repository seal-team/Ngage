'use strict'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'

import Routes from './routes'
import WhoAmI from './components/WhoAmI'
import Nav from './components/Nav'

import store from './store'
import { fetchUser } from './reducer'

import '../public/index.scss'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged(user => {
      console.log('auth state change user', user)
      user && this.props.fetchUser(user.uid)
    })
  }

  render() {
    return (
      <div className="app-container">
        <Nav />
        <Routes />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

const mapDispatch = { fetchUser }

const ConnectedApp = withRouter(connect(mapState, mapDispatch)(App))

render(
  <Provider store={store}>
    <Router>
      <ConnectedApp />
    </Router>
  </Provider>,
  document.getElementById('main')
)
