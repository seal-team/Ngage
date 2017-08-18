import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      slides: null,
      slidesCount: 0
    }
  }

  componentDidMount() {
    const slides = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')

    slides.on('value', (snapshot) => {
      const value = snapshot.val()
      this.setState({slides: value})
    })
  }

  makeNewSlide = (e) => {
    e.preventDefault()
    const activePresentation = firebase.database()
      .ref('users')
      .child(this.props.user)
      .child('activePresentation')

    activePresentation.on('value', snapshot => {
      const value = snapshot.val()
      const slides = firebase.database()
        .ref('presentations')
        .child(value)
        .child('slides')

      const newSlide = slides.push({number: this.state.slidesCount})
      console.log('newSlide id: ', newSlide.key)
      this.props.history.push(`/edit/${this.props.presID}/slide/${newSlide.key}`)
    })

    this.setState({ slidesCount: this.state.slidesCount++ })
  }

  selectSlide = (slide) => {
    this.props.selectSlide(slide)
    this.props.history.push(`/edit/${this.props.presID}/slide/${slide}`)
  }

  render() {
    const slides = this.state.slides
    return (
      <div>
        <div className="timeline-strip">
          <div className="left-arrow-btn">
            <span className="icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
          </div>
          
          {slides && Object.keys(slides).map((slide, i) => (
            <div key={i} className="timeline-slide"
              onClick={() => this.selectSlide(slide)}>
                <text>{slide}</text>
            </div>
          ))}

          <div className="plus-slide-btn"
            onClick={this.makeNewSlide}>
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

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default withRouter(connect(mapState)(Timeline))
