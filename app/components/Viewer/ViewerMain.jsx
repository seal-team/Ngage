import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

import SlideCanvasViewer from './SlideCanvasViewer'
import Chat from './chat'
import Scratchpad from './scratchpad'
import Graph from './Graph'
import { getSlides } from '../../helpers'

class ViewerMain extends Component {
  constructor() {
    super()
    this.state = {
      presentationID: '',
      owner: null,
      user: null,
      disabledSlides: true,
      disable: false,
      slideID: null
    }
  }

  componentDidMount(props) {
    const { presentationID } = this.props.match.params

    firebase.database()
      .ref(`presentations/${presentationID}/userID`)
      .on('value', snapshot => {
        const creator = snapshot.val()
        this.setState({ owner: creator, user: this.props.user })
        if (creator) {
          if (creator === this.props.user) {
            this.setState({ disabledSlides: false })
          }
        }
      })
  }

  disableUsers = () => {
   this.setState(prevState => ({ disable: !prevState.disable }))
  }

  render() {
    const { presentationID } = this.props.match.params
    const { slideID, disabledSlides } = this.state
    
    return (
      <div className="viewer-main-container">
        <div>
          <div className="section columns slide-and-chat">
            <div className="slide column">
              <SlideCanvasViewer
                presID={presentationID}
                disabled={disabledSlides}
              />
            </div>
            <div className="chat-super-container column">
              <h3 className="chat-title">Chat</h3>
              <div className="chat-container">
                  <Chat presentationID={presentationID} />
              </div>
            </div>
          </div>

          <div className="scratchpad-and-graph section columns">
            <div className="notes column">
              <h3 className="notes-title">Your Notes</h3>
              <Scratchpad presentationID={presentationID} userID={this.props.user} />
            </div>
            <div className="graph column">
              <h3 className="graph-title">Quiz results</h3>
              <div className="graph-container column">
                <Graph />
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.disableUsers}>
            disable User chatbox and notes
        </button>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user
})

export default withRouter(connect(mapState)(ViewerMain))
