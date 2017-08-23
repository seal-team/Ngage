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
      graphDisabled: false,
      pollData: []
    }
  }

  componentDidMount(props) {
    const { presentationID } = this.props.match.params

    firebase.database()
      .ref(`presentations/${presentationID}`)
      .on('value', snapshot => {
        const {owner, title} = snapshot.val()
        //const title = snapshot.val().title
        this.setState({ owner, user: this.props.user, title })
        if (owner) {
          if (owner === this.props.user) {
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

  disableGraph = () => {
    this.setState({graphDisabled: !this.state.graphDisabled})
  }

  render() {
    const { pollData, disabledSlides, slideType, activeSlideID, title } = this.state
    const { presentationID } = this.props.match.params

    return (
      <div className="viewer-main-container">
        {this.state.firstSlide &&
          <div>
            <div className="section columns slide-and-chat">
              <div className="slide column">
              <h3 className="chat-title">{title}</h3>
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
                <Scratchpad
                  presentationID={presentationID}
                  userID={this.props.user}
                  disabled={this.state.disable}
                />
              </div>
              <div className="graph column">
                <h3 className="graph-title">Quiz results</h3>
                <div className="graph-container column">
                  { slideType === 'quiz' && this.state.graphDisabled && <Graph activeSlideID={activeSlideID} /> }
                </div>
              </div>
            </div>
          </div>
        }
        <button onClick={this.disableGraph}>
            disable graphs
        </button>
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
