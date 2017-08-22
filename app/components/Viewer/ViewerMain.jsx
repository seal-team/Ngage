import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

import SlideCanvasViewer from './SlideCanvasViewer'
import Chat from './chat'
import Scratchpad from './scratchpad'
import Graph from './Graph'

import { getSlideType } from '../../helpers'

class ViewerMain extends Component {
  constructor() {
    super()
    this.state = {
      presentationID: '',
      activeSlideID: '',
      slideType: '',
      firstSlide: '',
      owner: '',
      user: '',
      disabledSlides: true,
      disable: false,
      pollData: []
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

    const slides = firebase.database()
      .ref(`presentations/${presentationID}/slides`)
      .on('value', snapshot => {
        const value = snapshot.val()
        const firstSlide = Object.keys(value)[0]
        this.setState({ presentationID, firstSlide })
      })

    firebase.database()
      .ref(`presentations/${presentationID}/active`)
      .on('value', snapshot => {
        const activeSlideID = snapshot.val()
        if (activeSlideID) {
          this.setState({
            activeSlideID,
            slideType: getSlideType(presentationID, activeSlideID)
          })
        }
      })
  }

  disableUsers = () => {
    this.setState({disable: !this.state.disable})
  }

  render() {
    const { pollData, disabledSlides, slideType, activeSlideID } = this.state
    const { presentationID } = this.props.match.params

    return (
      <div className="viewer-main-container">
        {this.state.firstSlide &&
          <div>
            <div className="section columns slide-and-chat">
              <div className="slide column">
                <SlideCanvasViewer
                  presID={presentationID}
                  slideID={this.state.firstSlide}
                  disabled={disabledSlides}
                  updateGraph={this.updateGraph}
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
                  { slideType === 'quiz' && <Graph activeSlideID={activeSlideID} /> }
                </div>
              </div>
            </div>
          </div>
        }
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
