import React, { Component } from 'react'
import firebase from 'firebase'

import QuillViewer from './QuillViewer'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      slides: null,
      counter: 0
    }
    this.submitSlideText = this.submitSlideText.bind(this)
  }

  componentDidMount() {
    const slides = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
    slides.on('value', (snapshot) => {
      const allslides = snapshot.val()
      this.setState({slides: allslides})
    })
    const slide = slides.child(this.props.slideID)
    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      console.log('this is the value', value)
      this.setState({info: value})
    })
  }

  submitSlideText(evt) {
    evt.preventDefault()
  }

  toggleBack = () => {
    const currSlide = Object.keys(this.state.slides)[(this.state.counter - 1)]
    const slide = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(currSlide)

    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      this.setState({info: value, counter: --this.state.counter})
    })
  }

  toggleFoward = () => {
    const currSlide = Object.keys(this.state.slides)[(this.state.counter + 1)]
    const slide = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(currSlide)

    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      this.setState({info: value, counter: ++this.state.counter})
      console.log('slide', value, this.state.counter)
    })
  }

  render() {
    console.log('counter', this.state.counter)
    const info = this.state.info
    return (
    <div>
     {this.state.slides &&
      <div className="slide-canvas-container">
        <QuillViewer presID = {this.props.presID} slideID = {this.props.slideID} />
        <button disabled={!this.state.counter} onClick={this.toggleBack}>
            Back
        </button>
        <button disabled={(this.state.counter === (Object.keys(this.state.slides).length -1))} onClick={this.toggleFoward}>
            Next
        </button >
      </div>}
    </div>
    )
  }
}

export default SlideCanvas
