import React, { Component } from 'react'
import firebase from 'firebase'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.submitSlideText = this.submitSlideText.bind(this)
  }

  // componentDidMount() {
  //   console.log(this.props)
  //   const db = firebase.database()
  //   const activeSlide = db.ref('presentations')
  //     .child(this.props.activeSlide)
  //   activeSlide.on('value', (snap) => {
  //     const value = snap.val()
  //     //dunno what to do here
  //     this.setState({activeSlide: value})
  //   })
  // }

  submitSlideText(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div className="slide-canvas-container">
        <form onSubmit={this.submitSlideText}>
          <div className="control">
            <input
              className="input"
              name="slideTitle"
              type="text"
              placeholder="Your Title"
            />
          </div>
          <div className="control">
            <input
              className="input"
              name="slideContent"
              type="text"
              placeholder="Your Text"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SlideCanvas
