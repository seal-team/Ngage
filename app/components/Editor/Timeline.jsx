/* global $ */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { quillContentsNew } from './quillDefaults'

import {
  getSlides,
  getSlideType,
  getQuillSnippet,
  getQuestion,
  slideMetadata
} from '../../helpers'
import DeleteSlideModal from '../DeleteSlideModal'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: {},
      slidesCount: 1,
      selectedSlide: 0,
      quillSnippet: '',
      showModal: false,
      deleteGoTo: ''
    }
  }

  componentDidMount() {
    this.getSlides()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getSlides()
    }
  }

  getSlides = () => {
    const { presentationID } = this.props.match.params
    firebase.database()
      .ref(`presentations/${presentationID}/slides`)
      .on('value', snapshot => {
        this.setState({ slides: snapshot.val() })
      })
  }

  sortSlides = () => {
    $("li[id*='slide']").detach().sort(function(a, b) {
      return +a.id.replace('slide', '') - b.id.replace('slide', '')
    }).appendTo('ul#slides')
  }

  makeNewSlide = () => {
    const { presentationID } = this.props.match.params
    this.setState({ slidesCount: this.state.slidesCount++ })
    this.sortSlides()

    const newSlide = firebase.database()
      .ref(`presentations/${presentationID}/slides`)
      .push({
        number: this.state.slidesCount,
        type: 'quill',
        quillContents: quillContentsNew
      }, () => {
        const numberOfSlides = this.slideli.childNodes.length
        if (numberOfSlides > 4) {
          const counter = numberOfSlides - 4
          for (let i = 1; i < counter; i++) {
            $('#carousel ul li:first').appendTo('ul#slides')
          }
        }
        this.props.history.push(`/edit/${this.props.presID}/slide/${newSlide.key}`)
      }
    )

    this.setState({ slidesCount: this.state.slidesCount++ })
  }

  selectSlide = slide => {
    this.props.selectSlide(slide)
    this.props.history.push(`/edit/${this.props.presID}/slide/${slide}`)
  }

  showNextSlides() {
    $('#carousel ul').animate({marginLeft: -200}, 500, function() {
      $(this).find('li:first').appendTo('ul#slides')
      $(this).css({marginLeft: 0})
    })
  }

  showPrevSlides = () => {
    $('#carousel ul').animate({marginLeft: 200}, 500, function() {
      $(this).find('li:last').prependTo('ul#slides')
      $(this).css({marginLeft: 0})
    })
  }

  handleModal = (deleteGoTo) => {
    this.setState({
      showModal: !this.state.showModal,
      deleteGoTo
    })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const { slides } = this.state

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

    return (
      <div>
        {this.state.showModal &&
          <DeleteSlideModal
            handleModal={this.handleModal}
            presentationID = {presentationID}
            slideID = {slideID}
            deleteGoTo = {this.state.deleteGoTo}
            sortSlides = {this.sortSlides}
          />
        }
        <div className="timeline-strip">
          <div className="left-arrow-btn"
            onClick={() => this.showPrevSlides()}>
            <span className="icon timeline-icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
          </div>

          <div id="carousel"><ul id="slides" ref={el => this.slideli = el}>
          {slides && Object.keys(slides).map((slide, i) => (
            <li key={i} id={`slide${i}`}>
            {console.log('type in timeline loop', getSlideType(presentationID, slide))}
            <div className={
              slide === slideID
                ? `timeline-slide timeline-slide-selected timeline-slide-${getSlideType(presentationID, slide)}`
                : `timeline-slide timeline-slide-${getSlideType(presentationID, slide)}`
              }
              onClick={() => this.selectSlide(slide)}>
                <div className="timeline-slide-contents-container">

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

                    <p className="timeline-slide-contents">
                      {slideMetadata(presentationID, slide).content}
                    </p>
              </div>
            </div></li>
          ))}
          </ul></div>
          <div className="plus-slide-btn"
            onClick={() => this.makeNewSlide()}>
            <span className="icon timeline-icon">
              <i className="fa fa-plus-square-o"></i>
            </span>
          </div>

          <div className="right-arrow-btn"
            onClick={() => this.showNextSlides()}>
            <span className="icon timeline-icon">
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
