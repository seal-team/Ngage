import React, { Component } from 'react'

import SlideCanvas from './SlideCanvas'
import PropertiesBar from './PropertiesBar'
import SideBar from './SideBar'
import Timeline from './Timeline'

class EditorMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timelineIsHidden: false
    }
    this.toggleTimeline = this.toggleTimeline.bind(this)
  }

  toggleTimeline() {
    this.setState({
      timelineIsHidden: !this.state.timelineIsHidden
    })
  }

  render() {
    const timelineIsHidden = this.state.timelineIsHidden
    console.log('EditorMain Props...', this.props)
    
    return (
      <div className="editor-main-container">
        <div className="columns everything-but-timeline">
          <div className="column is-2 sidebar-container">
            <SideBar />
          </div>

          <div className="column">
            <PropertiesBar />
            <SlideCanvas />
          </div>
        </div>

        <div className={`timeline-container ${timelineIsHidden ? 'timeline-condensed' : 'timeline-expanded'}`}
          onClick={() => this.toggleTimeline()}>
          <div className="arrow-div-container">
            <span className="icon arrow-container">
              <i className={`fa fa-6 fa-angle-double-${timelineIsHidden ? 'up' : 'down'} arrow`}></i>
            </span>
          </div>
        </div>
        {timelineIsHidden
          ? <div className="timeline-pad"></div>
          : <Timeline />
        }

      </div>
    )
  }
}

export default EditorMain
