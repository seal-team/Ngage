import React, { Component } from 'react'

class Timeline extends Component {
  constructor(props) {
    super(props)
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

          <div className="plus-slide-btn">
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
