import React, { Component } from 'react'

import SlideCanvas from './SlideCanvas'
import PropertiesBar from './PropertiesBar'
import SideBar from './SideBar'
import Timeline from './Timeline'
import firebase from 'firebase'

class EditorMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timelineIsHidden: false,
      activeSlide: ''
    }
    this.toggleTimeline = this.toggleTimeline.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    const db = firebase.database()
    const activeSlide = db.ref('presentations')
      .child(this.props)
      .child('active')
    activeSlide.on('value', (snap) => {
      const value = snap.val()
      this.setState({activeSlide: value})
    })
  }

  toggleTimeline() {
    this.setState({
      timelineIsHidden: !this.state.timelineIsHidden
    })
  }

  render() {
    const timelineIsHidden = this.state.timelineIsHidden
    return (
      <div className="editor-main-container">
        <div className="columns everything-but-timeline">
          <div className="column is-2 sidebar-container">
            <SideBar />
          </div>

          <div className="column">
            <PropertiesBar />
            <SlideCanvas activeSlide={this.state.activeSlide}/>
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
