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
import Nav from './components/Nav'
import { name } from './components/WhoAmI'
import store from './store'
import { fetchUser } from './reducer'

import '../public/index.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged(user => {
      user && this.props.fetchUser(user.uid)
      this.setState({ userName: name(user) })
    })
  }

  render() {
    const { auth, user } = this.props
    const { userName } = this.state

    return (
      <div className="app-container">
        <Nav userName={userName} />
        <Routes userName={userName} />
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
