import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import QuillViewer from './QuillViewer'
import QuizViewer from './QuizViewer'
import VRViewer from './mediaviewer/VRViewer'

import { getSlideType } from '../../helpers'

class SlideCanvasViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: null,
      type: null,
      slideID: null,
    }
    this.submitSlideText = this.submitSlideText.bind(this)
  }

  componentDidMount() {
    const { presentationID } = this.props.match.params
    firebase.database()
      .ref(`presentations/${presentationID}/active`)
      .on('value', snapshot => {
        const activeSlideId = snapshot.val()

        if (activeSlideId) {
          this.setState({
            slideID: activeSlideId,
            type: getSlideType(presentationID, activeSlideId)
          })
        }
      })

    const slides = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
    slides.on('value', (snapshot) => {
      const allslides = snapshot.val()
      this.setState({slides: allslides})
    })
  }

  componentWillUnmount() {
    const firstSlide = Object.keys(this.state.slides)[0]
    firebase.database()
      .ref(`/presentations/${this.props.presID}/active`)
      .set(firstSlide)
  }

  submitSlideText(evt) {
    evt.preventDefault()
  }

  toggleBack = (idx) => {
    const currSlide = Object.keys(this.state.slides)[idx - 1]
    const slide = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(currSlide)
    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      this.setState({
        type: value.type,
        slideID: currSlide
      })
    })
    const presentation = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
    presentation.child('active').set(currSlide)
  }

  toggleFoward = (idx) => {
    const currSlide = Object.keys(this.state.slides)[idx + 1]
    const slide = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(currSlide)

    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      this.setState({
        type: value.type,
        slideID: currSlide
      })
    })
    const presentation = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
    presentation.child('active').set(currSlide)
  }

  render() {
    let typeComp = null
    let currIdx = 0
    if (this.state.slides) {
      const type = this.state.type
      const slideID = this.state.slideID
      currIdx = Object.keys(this.state.slides).indexOf(slideID)
      if (type === 'quill') {
        typeComp = <QuillViewer presID={this.props.presID} slideID={this.state.slideID} />
      } else if (type === 'VR') {
        const VRContents = this.state.slides[slideID].VRContents
        typeComp = <VRViewer
          obj={VRContents.VRurl[0]}
          mtl={VRContents.VRurl[1]}
          description= {VRContents.description}/>
      } else if (type === 'quiz') {
        typeComp = <QuizViewer presID={this.props.presID} slideID={this.state.slideID} />
      }
    }
    return (
      <div>
      {this.state.slides &&
        <div className="slide-canvas-container">

          {typeComp}

          <div className="prev-btn-container">
            <button className="prev-slide-btn circle-btn"
                disabled={!currIdx || this.props.disabled}
                onClick={() => this.toggleBack(currIdx)} >
                <span className="icon">
                  <i className="fa fa-chevron-circle-left"></i>
                </span>
            </button>
          </div>

          <div className="next-btn-container">
            <button className="next-slide-btn circle-btn"
                disabled={
                    (currIdx === (Object.keys(this.state.slides).length -1)) ||
                    this.props.disabled
                }
                onClick={() => this.toggleFoward(currIdx)}>
                <span className="icon">
                  <i className="fa fa-chevron-circle-right"></i>
                </span>
            </button>
          </div>
        </div>}
      </div>
    )
  }
}

export default withRouter(SlideCanvasViewer)
