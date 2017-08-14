import React, { Component } from 'react'
import AddSlides from '../AddSlides'

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      slides: [],
      slidesCount: 0,
      uid: null
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({uid: user.uid})
            const activePresentation = firebase.database()
                .ref('users')
                .child(user.uid)
                .child('activePresentation')
            // activePresentation.on('value', (snapshot) => {
            //   let items = snapshot.val()
            // })
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
      const slides = firebase.database()
        .ref('presentation')
        .child(activePresentation)
        .child('slides')

      this.setState({ slidesCount: this.state.slidesCount++ })
      
      slides.child(this.state.slidesCount).set({})
  }

  render() {
    return (
      <div>
        <div className="timeline-strip">
          <div className="left-arrow-btn">
            <span className="icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
          </div>

          <div className="timeline-slide"></div>
          <div className="timeline-slide"></div>
          <div className="timeline-slide"></div>
          <div className="timeline-slide"></div>

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
