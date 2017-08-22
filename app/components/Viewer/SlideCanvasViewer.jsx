import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import QuillViewer from './QuillViewer'
import QuizViewer from './QuizViewer'

import { getSlides, getSlideType } from '../../helpers'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      slides: null,
      firstSlide: null,
      type: null,
      counter: 0,
      slideID: 0
    }
  }

  componentWillMount() {
    const { presentationID } = this.props.match.params

    getSlides(presentationID)
      .then(slides => {
        this.setState(prevState => ({
          slides,
          firstSlide: Object.keys(slides)[0]
        }))
      })
  }

  componentDidMount() {
    const { presentationID } = this.props.match.params
    firebase.database()
      .ref(`presentations/${presentationID}/active`)
      .on('value', snapshot => {
        const activeSlideId = snapshot.val()
        getSlideType(presentationID, activeSlideId)
          .then(type => {
            if (activeSlideId) {
              this.setState({
                slideID: activeSlideId,
                type
              })
            }
          })
      })
  }

  componentWillUnmount() {
    const firstSlide = Object.keys(this.state.slides)[0]
    firebase.database()
      .ref(`/presentations/${this.props.presID}/active`)
      .set(firstSlide)
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

    const presentation = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
    
    presentation.child('active').set(currSlide)
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
    const presentation = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
    presentation.child('active').set(currSlide)
  }

  render() {
    const { presID } = this.props
    const { type, slideID } = this.state

    console.log('Canvas State', this.state)
    console.log('Canvas props slideID', this.state.slideID)

    let typeComp = null
    if (type === 'quill') {
        typeComp = <QuillViewer presID={presID} slideID={slideID} />
    } else if (type === 'vr') {
        // typeComp = <VRViewer presID={this.props.presID} slideID={this.state.slideID} />
    } else if (type === 'quiz') {
        typeComp = <QuizViewer presID={presID} slideID={slideID} />
    }

    const info = this.state.info
    return (
      <div>
      {this.state.slides &&
        <div className="slide-canvas-container">
          
          {typeComp}

          <div className="prev-btn-container">
            <button className="prev-slide-btn circle-btn"
                disabled={!this.state.counter || this.props.disabled}
                onClick={this.toggleBack} >
                <span className="icon">
                  <i className="fa fa-chevron-circle-left"></i>
                </span>
            </button>
          </div>

          <div className="next-btn-container">
            <button className="next-slide-btn circle-btn"
                disabled={
                    (this.state.counter === (Object.keys(this.state.slides).length -1)) ||
                    this.props.disabled
                }
                onClick={this.toggleFoward}>
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

export default withRouter(SlideCanvas)
