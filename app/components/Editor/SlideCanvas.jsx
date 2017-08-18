import React, { Component } from 'react'
import firebase from 'APP/fire'

import QuillComp from './QuillComp'
import QuizCanvas from './Quiz/QuizCanvas'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null
    }
    this.submitSlideText = this.submitSlideText.bind(this)
  }

  componentDidMount() {
    const slide = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(this.props.slideID)

    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      this.setState({info: value})
    })

    // let slideType = 'quill'
    // firebase.database()
    //   .ref(`presentations/${this.props.presID}/slides/${this.props.slideID}/type`)
    //   .once('value', snapshot => {
    //     slideType = snapshot.val()
    //   })
    // console.log('slideType in didMount ', slideType)
  }

  submitSlideText(evt) {
    evt.preventDefault()
  }

  render() {
    const info = this.state.info
    const slideType = this.props.slideType
    slideType && console.log('slideType in canvas', slideType)

    return (
      <div className="slide-canvas-container">
        {slideType === 'quill' &&
          <QuillComp presID={this.props.presID} slideID={this.props.slideID} />
        }

        {slideType === 'quiz' &&
          <QuizCanvas />
        }
      </div>
    )
  }
}

export default SlideCanvas
