import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

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

        // for (var key in allActive) {
           
        // }
      })
  }
  render() {
    const { presentations } = this.state
    // const presArray = []
    // for (var key in presentations) {
    //   presArray.push(key)
    // }
    console.log('Live Presentation State', this.state.presentations)
    return (
      <div>
        <h1>LIVE PRESENTATIONS</h1>
        {presentations && Object.keys(presentations).map(presentationID => (
          <div>
            <h1>HELLO</h1>
            {console.log('inside loop presentationID', presentationID)}
            <Link to={`/view/${presentationID}`} >
              {presentationID}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}
