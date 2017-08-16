import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Welcome to nGage...</h1>
    <Link to="/login">LOGIN</Link>
  </div>
)

export default Home
