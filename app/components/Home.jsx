import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Feature} from './Feature'

import WhoAmI from './WhoAmI'

const Home = (props) => (
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
              { props.userName
                ? <div className="whoami"><div className="columns"><div className="column text-center"><button className="logoutBtn"></button></div></div></div>
                : <WhoAmI /> }
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
            <strong>nGage</strong> created by <br/>Evan Reed, Liang Li, Alvin Wen, Stacy Hirschberg
            <a className="icon margin-left-sm" href="https://github.com/seal-team/Ngage">
              <i className="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
)

export default Home
