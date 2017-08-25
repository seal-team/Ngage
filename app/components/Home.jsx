import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Feature} from './Feature'

import WhoAmI from './WhoAmI'

const Home = () => (
  <div id="grad1">
    <section className="hero">
        <div className="columns is-desktop is-multiline">
          <div id="hero-background2" className="column hero-body ">
            <div className="home-header">
              <span className="title welcome">Welcome to</span>
              <span className="logo-home">nGage.</span>
            </div>
            <p className="subtitle description">A platform for creating<br />
              interactive presentations
            </p>
            <div className ="column"/>
              <WhoAmI />
            </div>
        </div>
        <div className="columns is-desktop is-multiline">
            <div className="subtitle column video-title">
                <h1>Editor Mode</h1>
                <iframe width="580" height="365"
                src="https://www.youtube.com/embed/L8-TwN_uY2w?ecver=2&controls=0&loop=1">
              </iframe>
            </div>
            <div className="subtitle column video-title">
                <h1>Presentation Mode</h1>
                <iframe width="580" height="365"
                src="https://www.youtube.com/embed/L8-TwN_uY2w?ecver=2&controls=0&loop=1">
              </iframe>
            </div>
        </div>
    </section>
    <div className="feature-padding"></div>
    <Feature/>
  </div>
)

export default Home
