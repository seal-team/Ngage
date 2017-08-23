import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

import { getPresentationTitle } from '../helpers'

export default class LivePresentation extends Component {
  constructor() {
    super()
    this.state ={
      presentations: {}
    }
  }
  componentDidMount() {
    firebase.database()
      .ref('activePresentations')
      .on('value', snapshot => {
        const presentations = snapshot.val()
        this.setState({ presentations })
      })
  }
  render() {
    const { presentations } = this.state

    return (
      <div>
        <h1 className="title">Live Presentations</h1>
        {presentations && Object.keys(presentations).map(presentationID => (
          <div>
            <Link to={`/view/${presentationID}`} >
              {presentations[presentationID]}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}
