import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

import SlideCanvas from './SlideCanvas'
import Chat from './chat'
import Scratchpad from './scratchpad'
import Graph from './Graph'
// const sectionStyle = {
//   width: '100%',
//   height: '100%',
//   background-color: 'black'
// }

class ViewerMain extends Component {
  constructor() {
    super()
    this.state = {
      presentationID: '',
      firstSlide: '',
      owner: "",
      user: "",
      disabledSlides: true,
      disable: false,
      slideID: null
      
    }
  }
  
  componentDidMount(props) {
    const ref = firebase.database()
      .ref('presentations')
      .child('active')
    ref.on('child_changed', function(snapshot) {
      const theId = snapshot.val()
      this.setState({slideID: theId})
      console.log('my id', theId)
    })

    const presentationID = this.props.match.params.presentationID

    const owner = firebase.database()
      .ref('presentations')
      .child('userID')
    owner.on('value', snapshot => {
      const creator = snapshot.val()
      this.setState({ owner: creator, user: this.props.user })
    })

    const slides = firebase.database()
      .ref('presentations')
      .child(presentationID)
      .child('slides')

    slides.on('value', snapshot => {
      const value = snapshot.val()
      const firstSlide = Object.keys(value)[0]
      this.setState({ presentationID, firstSlide: firstSlide })
    })

    if (this.state.owner === this.state.user) {
      this.setState({ disabledSlides: false })
    }
  }

  disableUsers = () => {
    this.state.disable ? this.setState({disable: false}) : this.setState({disable: true})
  }

  render() {
    const disabledSlides = this.state.disabledSlides

    return (
      <div className="viewer-main-container">
        {this.state.firstSlide &&
          <div>
            <div className="section columns slide-and-chat">
              <div className="slide column">
                <SlideCanvas 
                  presID={this.props.match.params.presentationID}
                  slideID={this.state.slideID || this.state.firstSlide}
                  disabled={disabledSlides}
                />
              </div>
              <div className="chat-super-container column">
                <h3 className="chat-title">Chat</h3>
                <div className="chat-container">
                    <Chat presentationID={this.state.presentationID} />
                </div>
              </div>
            </div>

            <div className="scratchpad-and-graph section columns">
              <div className="slide column">
                <h3 className="notes-title">Your Notes</h3>
                <Scratchpad presentationID={this.state.presentationID} userID={this.props.user} />
              </div>
              <div className="graph-container column is-3">
                <h3 className="graph-title">Quiz results</h3>
                <Graph />
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
