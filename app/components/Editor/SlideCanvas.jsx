import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import QuillComp from './QuillComp'
import QuizCanvas from './Quiz/QuizCanvas'
import { getSlideType } from '../../helpers'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null
    }
  }

  componentDidMount() {
    const { presentationID, slideID } = this.props.match.params
    firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}`)
      .once('value', snapshot => {
        this.setState({ info: snapshot.val() })
      })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const info = this.state.info
    const slideType = getSlideType(presentationID, slideID)

    return (
      <div className="slide-canvas-container">
        { slideType === 'quill' && <QuillComp /> }

        { slideType === 'quiz' && <QuizCanvas toggleQuizModal={this.props.toggleQuizModal} /> }
      </div>
    )
  }
}

export default withRouter(SlideCanvas)
