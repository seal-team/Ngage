import React, { Component } from 'react'
import firebase from 'firebase'

import QuillViewer from './QuillViewer'
import QuizViewer from './QuizViewer'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      slides: null,
      type: null,
      counter: 0,
      slideID: null
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
      this.setState({
        info: value,
        type: value.type,
        slideID: this.props.slideID
      })
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
      this.setState({
        info: value,
        type: value.type,
        counter: --this.state.counter, 
        slideID: currSlide
      })
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
      this.setState({
        info: value,
        type: value.type,
        counter: ++this.state.counter,
        slideID: currSlide
     })
    })
  }

  render() {
    console.log('slideid', this.state.slideID, this.state.type)
    const type = this.state.type

    let typeComp = null
    if (type === 'quill') {
        typeComp = <QuillViewer presID={this.props.presID} slideID={this.state.slideID} />
    } else if (type === 'vr') {
        typeComp = 'vr'
    } else if (type === 'quiz') {
        typeComp = <QuizViewer presID={this.props.presID} slideID={this.state.slideID} />
    }

    const info = this.state.info
    return (
    <div>
     {this.state.slides &&
      <div className="slide-canvas-container">
        
        {typeComp}
        
        <button className="prev-slide-btn"
            disabled={!this.state.counter || this.props.disabled}
            onClick={this.toggleBack} >
            <span className="icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
        </button>
        <button className="next-slide-btn"
            disabled={
                (this.state.counter === (Object.keys(this.state.slides).length -1)) ||
                this.props.disabled
            }
            onClick={this.toggleFoward}>
            <span className="icon">
              <i className="fa fa-chevron-circle-right"></i>
            </span>
        </button >
      </div>}
    </div>
    )
  }
}

export default SlideCanvas
