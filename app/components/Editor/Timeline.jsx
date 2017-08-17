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

  handleSubmit = (e) => {
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

      slides.push({number: this.state.slidesCount})
    })

    this.setState({ slidesCount: this.state.slidesCount++ })
  }

  handleClick = (slide) => {
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
          {
            slides && Object.keys(slides).map((slide, i) => {
              return (
                <div className="timeline-slide" key={i} onClick={() => this.handleClick(slide)}>
                  <text>{slide}</text>
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

const mapState = state => ({
  user: state.user,
  auth: state.auth
})

export default withRouter(connect(mapState)(Timeline))
