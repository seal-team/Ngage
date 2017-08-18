import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import SlideCanvas from './SlideCanvas'
import PropertiesBar from './PropertiesBar'
import SideBar from './SideBar'
import Timeline from './Timeline'

class EditorMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timelineIsHidden: false,
      presentationID: 'default',
      slideID: 'default'
    }

    this.toggleTimeline = this.toggleTimeline.bind(this)
    this.forceRerender = this.forceRerender.bind(this)
  }

  toggleTimeline() {
    this.setState({
      timelineIsHidden: !this.state.timelineIsHidden
    })
  }

  toggleToPresentMode = () => {
    this.props.history.push(`/view/${this.props.match.params.presentationID}`)
  }

  selectSlide = slideID => {
    this.setState({ slideID })
  }
  
  forceRerender() {
    this.forceUpdate()
  }

  render() {
    const timelineIsHidden = this.state.timelineIsHidden
    const { presentationID, slideID } = this.props.match.params

    let slideType = 'quill'
    firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/type`)
      .once('value', snapshot => {
        slideType = snapshot.val()
      })
    console.log('slideType in render ', slideType)

    return (
      <div className="editor-main-container">
        <div className="columns everything-but-timeline">
          <div className="column is-2 sidebar-container">
            <SideBar forceRerender={this.forceRerender} />
          </div>

          <div className="column">
            <PropertiesBar />

            <button onClick={this.toggleToPresentMode}>
              View Presentation
            </button>
            <SlideCanvas
              presID={this.props.match.params.presentationID} 
              slideID={this.state.slideID}
              slideType={slideType}
            />
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
          : <Timeline
              selectSlide={this.selectSlide}
              presID={this.props.match.params.presentationID}
            />
        }

      </div>
    )
  }
}

export default withRouter(EditorMain)
