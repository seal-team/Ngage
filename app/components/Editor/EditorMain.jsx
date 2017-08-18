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
      slideID: 'default',
      presTitle: ''
    }

    this.toggleTimeline = this.toggleTimeline.bind(this)
    this.forceRerender = this.forceRerender.bind(this)
  }

  componentDidMount() {
    const presentRef = firebase.database()
      .ref('presentations')
      .child(this.props.match.params.presentationID)
      .child('title')
    presentRef.on('value', (snapshot) => {
      const presTitle = snapshot.val()
      this.setState({ presTitle })
    })
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

    return (
      <div className="editor-main-container">
        <div className="columns everything-but-timeline">
          <div className="column is-2 sidebar-container">
            <h1 className="subtitle pres-label-title">Presentation:</h1>
            <h1 className="title presentation-title">{this.state.presTitle}</h1>
            <SideBar forceRerender={this.forceRerender} />
          </div>

          <div className="column">
            <div className="slide-canvas-container">
              <SlideCanvas
                presID={this.props.match.params.presentationID} 
                slideID={this.state.slideID}
                slideType={slideType}
              />
            </div>
          </div>
          
          <div className="column">
            <button className="button is-info view-pres-btn"
              onClick={this.toggleToPresentMode}>
              View Presentation
            </button>
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
