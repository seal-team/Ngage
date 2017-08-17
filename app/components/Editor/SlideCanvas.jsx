import React, { Component } from 'react'
import firebase from 'firebase'

import QuillComp from '../QuillComp'

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
      console.log('this is the value', value)
      this.setState({info: value})
    })
  }

  submitSlideText(evt) {
    evt.preventDefault()
    console.log(

    )
  }

  render() {
    const info = this.state.info
    return (
      <div className="slide-canvas-container">
        <QuillComp presID = {this.props.presID} slideID = {this.props.slideID} />
      </div>
    )
  }
}

export default SlideCanvas
