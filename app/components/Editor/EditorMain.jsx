import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import SlideCanvas from './SlideCanvas'
import SideBar from './SideBar'
import Timeline from './Timeline'
import QuizModal from './Quiz/QuizModal'
import { getPresentationTitle } from '../../helpers'

class EditorMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timelineIsHidden: false,
      quizModalIsShowing: false,
      quizIsNew: false,
      presentationID: 'default',
      slideID: 'default',
      presTitle: ''
    }
  }

  componentDidMount() {
    this.getPresentationID()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getPresentationID()
    }
  }

  getPresentationID = () => {
    const { presentationID } = this.props.match.params
    getPresentationTitle(presentationID)
      .then(presTitle => this.setState(prevState => ({ presTitle })))
      .catch(console.error)
  }

  toggleTimeline = () => {
    this.setState(prevState => ({
      timelineIsHidden: !prevState.timelineIsHidden
    }))
  }

  toggleQuizModal = quizIsNew => {
    this.setState(prevState => ({ quizIsNew }))
    this.setState(prevState =>
      ({ quizModalIsShowing: !prevState.quizModalIsShowing })
    )
  }

  toggleToPresentMode = presentationID => {
    this.props.history.push(`/view/${presentationID}`)
  }

  selectSlide = slideID => {
    this.setState({ slideID })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const { timelineIsHidden, quizModalIsShowing } = this.state

    return (
      <div>
        {quizModalIsShowing &&
          <QuizModal
            toggleQuizModal={this.toggleQuizModal}
            quizIsNew={this.state.quizIsNew}
          />
        }

        <div className="editor-main-container">
          <div className="columns everything-but-timeline">
            <div className="column is-2 sidebar-container">
              <h1 className="subtitle pres-label-title">Presentation:</h1>
              <h1 className="title presentation-title">{this.state.presTitle}</h1>

              <button className="button is-info view-pres-btn"
                onClick={() => this.toggleToPresentMode(presentationID)}>
                View Presentation
              </button>

              <SideBar toggleQuizModal={this.toggleQuizModal} />
            </div>

            <div className="column">
              <div className="slide-canvas-super-container">
                <SlideCanvas
                  presID={presentationID}
                  slideID={this.state.slideID}
                  toggleQuizModal={this.toggleQuizModal}
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
      </div>
    )
  }
}

export default withRouter(EditorMain)
