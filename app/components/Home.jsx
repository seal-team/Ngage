import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = () => (
  <div className="columns">
    <div className="column"></div>

    <div className="colum">
      <h1>Welcome to nGage</h1>
      <h1>Welcome to nGage</h1>
      <h1>Welcome to nGage</h1>
      <h1>Welcome to nGage</h1>
      <Link to="/login">LOGIN</Link>
      <h1>Welcome to nGage</h1>
      <h1>Welcome to nGage</h1>
      <h1>Welcome to nGage</h1>
      <h1>Welcome to nGage</h1>
    </div>

    <div className="column"></div>
  </div>
)

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapState)(Home)
