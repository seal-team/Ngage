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
import DeleteSlideModal from '../DeleteSlideModal'

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      slides: {},
      fourSlides: [],
      slidesCount: 1,
      selectedSlide: 0,
      quillSnippet: '',
      showModal: false,
      deleteGoTo: ''
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
    // this.setState((prevState, props) => {
    //   return {slidesCount: prevState.slidesCount++}
    // })
  //   this.setState({showForm : !this.state.showForm})
  //   this.setState(function(prevState, props){
  //     return {showForm: !prevState.showForm}
  //  })

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

  handleModal = (deleteGoTo) => {
    this.setState({
      showModal: !this.state.showModal,
      deleteGoTo
    })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const { slides, fourSlides } = this.state

    if (slides) {
      Object.keys(slides).forEach((slide, i) => {
        if (Object.keys(slides).length === 1) {
          slides[slide].showDelete = false
        } else {
          slides[slide].showDelete = true
        }
        if (i===0 && Object.keys(slides)[1]) {
          slides[slide].deleteGoTo = Object.keys(slides)[1]
        } else {
          slides[slide].deleteGoTo = Object.keys(slides)[i-1]
        }
      })
    }

    console.log('all slides: ', slides)
    console.log('four slides: ', fourSlides)

    return (
      <div>
        {this.state.showModal &&
          <DeleteSlideModal
            handleModal={this.handleModal}
            presentationID = {presentationID}
            slideID = {slideID}
            deleteGoTo = {this.state.deleteGoTo}
          />
        }
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
                    {slides[slide].showDelete &&
                      <span className="icon remove-slide-btn">
                        <i className="fa fa-times"
                          onClick={() => this.handleModal(slides[slide].deleteGoTo)}>
                        </i>
                      </span>
                    }
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
