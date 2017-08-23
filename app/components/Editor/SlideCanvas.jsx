import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import QuillComp from './QuillComp'
import QuizCanvas from './Quiz/QuizCanvas'
import VRComp from './VRComp'
import { getSlideType } from '../../helpers'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getSlide()
    }
  }

  componentDidMount() {
    this.getSlide()
  }

  getSlide = () => {
    const { presentationID } = this.props.match.params
    firebase.database()
      .ref(`presentations/${presentationID}/slides/`)
      .on('value', snapshot => {
        const { slideID } = this.props.match.params
        this.setState({ info: snapshot.val()[slideID] })
      })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const info = this.state.info
    const slideType = getSlideType(presentationID, slideID)
    return (
      <div className="slide-canvas-container">
        { slideType === 'quill' && <QuillComp /> }
        { slideType === 'VR' && this.state.info.VRContents && <VRComp
          obj={this.state.info.VRContents.VRurl[0]}
          mtl={this.state.info.VRContents.VRurl[1]}
          description= {this.state.info.VRContents.description}/>}
        { slideType === 'quiz' && <QuizCanvas toggleQuizModal={this.props.toggleQuizModal} /> }
      </div>
    )
  }
}

export default withRouter(SlideCanvas)
