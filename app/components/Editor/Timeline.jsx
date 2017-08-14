import React, { Component } from 'react'
import AddSlides from '../AddSlides'
import firebase from 'firebase'

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      slides: null,
      slidesCount: 0,
      uid: null
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid})
        console.log('user.uid', user.uid)
        const activePresentation = firebase.database()
          .ref('users')
          .child(user.uid)
          .child('activePresentation')
        activePresentation.on('value', (snapshot) => {
          const value = snapshot.val()
          const slides = firebase.database()
            .ref('presentations')
            .child(value)
            .child('slides')
          slides.on('value', (snapshot) => {
            const value = snapshot.val()
            console.log('slides', value)
            this.setState({slides: value})
          })
        })
      } else {
        this.setState({uid: null})
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const activePresentation = firebase.database()
      .ref('users')
      .child(this.state.uid)
      .child('activePresentation')
    activePresentation.on('value', (snapshot) => {
      const value = snapshot.val()
      const slides = firebase.database()
        .ref('presentations')
        .child(value)
        .child('slides')
      slides.push({number: this.state.slidesCount})
    })
    this.setState({ slidesCount: this.state.slidesCount++ })
  }

  render() {
    const slides = this.state.slides
    console.log('what is this', slides)
    return (
      <div>
        <div className="timeline-strip">
          <div className="left-arrow-btn">
            <span className="icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
          </div>
          {
            slides && Object.values(slides).map((slide) => {
              return (
                <div className="timeline-slide">
                  
                  <text>{slide.number}</text>
                </div>
              )
            })
          }

          <div className="plus-slide-btn"
            onClick={this.handleSubmit}>
            <span className="icon">
              <i className="fa fa-plus-square-o"></i>
            </span>
          </div>

          <div className="right-arrow-btn">
            <span className="icon">
              <i className="fa fa-chevron-circle-right"></i>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Timeline
