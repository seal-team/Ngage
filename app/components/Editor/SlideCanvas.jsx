import React, { Component } from 'react'

class SlideCanvas extends Component {
  constructor(props) {
    super(props)
    this.submitSlideText = this.submitSlideText.bind(this)
  }

  submitSlideText(evt) {
    evt.preventDefault()
    console.log(
      
    )
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
