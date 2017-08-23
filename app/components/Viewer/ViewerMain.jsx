import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

import SlideCanvasViewer from './SlideCanvasViewer'
import Chat from './chat'
import Scratchpad from './scratchpad'
import Graph from './Graph'

import { getSlideType, getPresentationTitle } from '../../helpers'

class ViewerMain extends Component {
  constructor() {
    super()
    this.state = {
      presentationID: '',
      activeSlideID: '',
      slideType: '',
      title: '',
      firstSlide: '',
      owner: '',
      user: '',
      disabledSlides: true,
      disable: false,
      graphDisabled: false,
      pollData: [],
    }
  }

  componentDidMount(props) {
    const { presentationID } = this.props.match.params

    firebase.database()
      .ref(`presentations/${presentationID}`)
      .on('value', snapshot => {
        const { userID, title } = snapshot.val()
        this.setState({
          owner: userID,
          user: this.props.user,
          title
        })
        if (userID) {
          if (userID === this.props.user) {
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

    getPresentationTitle(presentationID)
      .then(title => {
        const { owner, user } = this.state

        const activePresentationRef = firebase.database()
          .ref(`activePresentations/${presentationID}`)
          
        activePresentationRef.set(title)

        window.onbeforeunload = e => {
          if (owner === user) {
            activePresentationRef.remove()
            return null
          }
        }
      })
  }

  componentWillUnmount() {
    const { presentationID } = this.props.match.params
    const { owner, user } = this.state

    if (owner === user) {
      firebase.database()
        .ref(`activePresentations/${presentationID}`).remove()
    }
  }

  disableUsers = () => {
    this.setState({disable: !this.state.disable})
  }

  disableGraph = () => {
    this.setState({graphDisabled: !this.state.graphDisabled})
  }

  render() {
    const { owner, user, pollData, disabledSlides, slideType, activeSlideID, title } = this.state
    const { presentationID } = this.props.match.params

    console.log('Viewer State', this.state)
    return (
      <div className="viewer-main-container">
        {this.state.firstSlide &&
          <div>
            <div className="section columns slide-and-chat">
              <div className="slide column">
              <h3 className="slide-title">{title}</h3>
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
                  { slideType === 'quiz' && !this.state.graphDisabled && <Graph activeSlideID={activeSlideID} /> }
                </div>
              </div>
            </div>
          {owner === user &&
          <a className="button is-primary disable-graph" onClick={this.disableGraph}>
            <span class="icon is large">
              <i class="fa"></i>
            </span>
            <span>Disable Graphs</span>
          </a>}
          {owner === user &&
          <a className="button is-primary disable-notes" onClick={this.disableUsers} >
            <span class="icon is large">
              <i class="fa"></i>
            </span>
            <span>Disable Notes</span>
          </a>}
          </div>
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user
})


export default withRouter(connect(mapState)(ViewerMain))
