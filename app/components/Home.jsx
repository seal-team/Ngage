import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import WhoAmI from './WhoAmI'

const Home = () => (
  <div className="columns">
    <div className="column"></div>

    <div className="column">
      <div className="home-header">
        <span className="title is-two-quarters welcome">Welcome to</span>
        <span className="logo-home">nGage.</span>
      </div>
      <p className="subtitle description">A platform for creating<br />
        interactive presentations
      </p>
      
      <WhoAmI />
     
      <h1 className="subtitle video-title">Edit Mode</h1>
      <div>
        <iframe width="580" height="365"
          src="https://www.youtube.com/embed/L8-TwN_uY2w?ecver=2&controls=0&loop=1">
        </iframe>
      </div>

      <h1 className="subtitle video-title">Present Mode</h1>
      <div>
        <iframe width="580" height="365"
          src="https://www.youtube.com/embed/L8-TwN_uY2w?ecver=2&controls=0&loop=1">
        </iframe>
      </div>
     
    </div>

    <div className="column"></div>
  </div>
)

export default Home
