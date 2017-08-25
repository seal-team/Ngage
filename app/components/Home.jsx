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
        <div className="columns is-desktop is-multiline section-padding">
            <div className="subtitle column video-title">
                <h1 className='home-title'>Editor Mode</h1>
                <iframe width="580" height="365"
                src="https://www.youtube.com/embed/L8-TwN_uY2w?ecver=2&controls=0&loop=1">
              </iframe>
            </div>
            <div className="subtitle column video-title">
                <h1 className='home-title'>Presentation Mode</h1>
                <iframe width="580" height="365"
                src="https://www.youtube.com/embed/L8-TwN_uY2w?ecver=2&controls=0&loop=1">
              </iframe>
            </div>
        </div>
    </section>
    <Feature/>
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>nGage</strong> by <a href="http://fullstackacademy.com">FullStack Academy</a>.
          </p>
          <p>
            <a className="icon" href="https://github.com/seal-team/Ngage">
              <i className="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
)

export default Home
