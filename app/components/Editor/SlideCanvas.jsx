import React, { Component } from 'react'
import firebase from 'firebase'

import QuillComp from './QuillComp'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      slideType: 'quill'
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

    let slideType = 'quill'
    firebase.database()
      .ref(`presentations/${this.props.presID}/slides/${this.props.slideID}/type`)
      .once('value', snapshot => {
        slideType = snapshot.val()
      })
    console.log('slideType in didMount ', slideType)
    this.setState({ slideType })
  }

  submitSlideText(evt) {
    evt.preventDefault()
  }

  render() {
    const info = this.state.info
    const slideType = this.state.slideType
    console.log('slideType in render ', slideType)
    return (
      <div className="slide-canvas-container">
        <QuillComp presID={this.props.presID} slideID={this.props.slideID} />
      </div>
    )
  }
}

export default SlideCanvas
