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
  }

  componentDidMount() {
    const presentationID = this.props.match.params.presentationID
    
    firebase.database().ref(`presentations/${presentationID}/title`)
      .once('value', snapshot => {
        this.setState({ presTitle: snapshot.val() })
      })
  }

  toggleTimeline = () => {
    this.setState({
      timelineIsHidden: !this.state.timelineIsHidden
    })
  }

  toggleToPresentMode = () => {
    const presentationID = this.props.match.params.presentationID
    this.props.history.push(`/view/${presentationID}`)
  }

  selectSlide = slideID => {
    this.setState({ slideID })
  }
  
  forceRerender = () => {
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

            <button className="button is-info view-pres-btn"
              onClick={this.toggleToPresentMode}>
              View Presentation
            </button>

            <SideBar forceRerender={this.forceRerender} />
          </div>

          <div className="column">
            <div className="slide-canvas-super-container">
              <SlideCanvas
                presID={presentationID} 
                slideID={this.state.slideID}
                slideType={slideType}
                forceRerender={this.forceRerender}
              />
            </div>
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
              presID={presentationID}
            />
        }

      </div>
    )
  }
}

export default withRouter(EditorMain)
