import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { DefaultPlayer as Video } from 'react-html5video'
import 'react-html5video/dist/styles.css'

import WhoAmI from './WhoAmI'

const Home = () => (
  <div className="columns">
    <div className="column"></div>

    <div className="column">
      <h1 className="title is-two-quarters welcome">Welcome to nGage.</h1>
      <p className="subtitle description">A platform for creating<br />
        interactive presentations
      </p>
      
     {/* <Video autoPlay loop muted
        controls={['PlayPause', 'Seek', 'Time']}>
        <source src="../../public/media/EditorMode.webm" type="video/webm" />
     </Video> */}

      <WhoAmI />
    </div>

    <div className="column"></div>
  </div>
)

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapState)(Home)
