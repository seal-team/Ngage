import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

import {
  getSlides,
  getSlideType,
  getQuillSnippet,
  getQuestion,
  slideMetadata
} from '../../helpers'

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      slides: {},
      fourSlides: [],
      slidesCount: 1,
      selectedSlide: 0,
      quillSnippet: ''
    }
  }

  componentDidMount() {
    const { presentationID } = this.props.match.params
    firebase.database()
      .ref(`presentations/${presentationID}/slides`)
      .on('value', snapshot => {
        this.setState({ slides: snapshot.val() })
      })
    this.setFourSlides(this.state.slides)
  }

  makeNewSlide = () => {
    this.setState({ slidesCount: this.state.slidesCount++ })

    firebase.database()
      .ref(`users/${this.props.user}/activePresentation`)
      .on('value', snapshot => {
        const activePresentation = snapshot.val()
        const newSlide = firebase.database()
          .ref(`presentations/${activePresentation}/slides`)
          .push({
            number: this.state.slidesCount,
            type: 'quill'
          })

        this.props.history.push(`/edit/${this.props.presID}/slide/${newSlide.key}`)
      })

    this.setState({ slidesCount: this.state.slidesCount++ })
  }

  selectSlide = slide => {
    this.props.selectSlide(slide)
    this.props.history.push(`/edit/${this.props.presID}/slide/${slide}`)
  }

  setFourSlides = slides => {
    const fourSlides = []
    for (let slide in slides) {
      if (slides[slide].number <= 4) {
        fourSlides.push(slide)
      }
    }

    this.setState({ fourSlides })
  }

  showNextSlides = () => {

  }

  showPrevSlides = () => {

  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const { slides, fourSlides } = this.state

    console.log('all slides: ', slides)
    console.log('four slides: ', fourSlides)
    
    return (
      <div>
        <div className="timeline-strip">
          <div className="left-arrow-btn"
            onClick={() => this.showPrevSlides()}>
            <span className="icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
          </div>

          {slides && Object.keys(slides).map((slide, i) => (
            <div key={i} className={
              slide === slideID
                ? `timeline-slide timeline-slide-selected timeline-slide-${getSlideType(presentationID, slide)}`
                : `timeline-slide timeline-slide-${getSlideType(presentationID, slide)}`
              }
              onClick={() => this.selectSlide(slide)}>
                <div className="timeline-slide-contents-container">
                  <div>
                    <span className="timeline-slide-num">{i + 1}</span>
                    <span className="timeline-slide-type">
                      {slideMetadata(presentationID, slide).type}
                    </span>
                  </div>
                  <p className="timeline-slide-contents">
                    {slideMetadata(presentationID, slide).content}
                  </p>
                </div>
            </div>
          ))}

          <div className="plus-slide-btn"
            onClick={() => this.makeNewSlide()}>
            <span className="icon">
              <i className="fa fa-plus-square-o"></i>
            </span>
          </div>

          <div className="right-arrow-btn"
            onClick={() => this.showNextSlides()}>
            <span className="icon">
              <i className="fa fa-chevron-circle-right"></i>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default withRouter(connect(mapState)(Timeline))
