import React, { Component } from 'react'
import firebase from 'firebase'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null
    }
    this.submitSlideText = this.submitSlideText.bind(this)
  }

  componentDidMount() {
    const slide = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(this.props.slideID)

    slide.on('value', (snapshot) => {
      const value = snapshot.val()
      console.log('this is the value', value)
      this.setState({info: value})
    })
  }

  submitSlideText(evt) {
    evt.preventDefault()
    console.log(
      
    )
  }

  render() {
    const info = this.state.info
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
