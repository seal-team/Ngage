import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = () => (
  <div className="columns">
    <div className="column"></div>
    
    <div className="column">
      <h1 className="title is-two-quarters welcome">Welcome to nGage.</h1>
      <p className="subtitle">A platform for creating<br />
        interactive presentations
      </p>
      <Link to="/login" className="goto-login">Login Here</Link>
    </div>
    
    <div className="column"></div>
  </div>
)

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapState)(Home)
