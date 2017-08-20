import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MediaModal from './Media/MediaModal'
import VRUploader from './Media/VRUploader'
import Uploader from './Media/Uploader'
import QuizModal from './Quiz/QuizModal'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: [false, false],
      uid: null,
      mediaType: '',
      mediaModal: false,
      updateModal: false,
      quizModal: false
    }
  }

  handleMediaModal = (e) => {
    this.setState({ mediaModal: !this.state.mediaModal })
  }

  handleUpdateModal = (e) => {
    this.setState({ updateModal: !this.state.updateModal })
  }

  toggleQuizModal = () => {
    this.setState({ quizModal: !this.state.quizModal })
  }

  toggleAcitveTab = index => {
    const activeState = [...this.state.activeTab]
      .map((item, i) => i === index || false)

    this.setState({ activeTab: activeState })
  }

  render() {
    const activeTab = this.state.activeTab
    const mediaType = this.state.mediaType

    return (
      <div>
        {this.state.mediaModal && 
          <MediaModal handleModal={this.handleMediaModal}
            handleUpdateModal={this.handleUpdateModal}
            uid={this.state.uid}
            history={this.props.history}
            mediaType={this.state.mediaType}
          />
        }

        {(this.state.mediaType === 'VR')
          ? (this.state.updateModal &&
              <VRUploader
                handleUpdateModal={this.handleUpdateModal}
                uid={this.state.uid}
                history={this.props.history} 
                mediaType={this.state.mediaType}
              />)
          : (this.state.updateModal && 
              <Uploader
                handleUpdateModal={this.handleUpdateModal}
                uid={this.state.uid}
                history={this.props.history} 
                mediaType={this.state.mediaType}
              />)
        }

        {this.state.quizModal &&
          <QuizModal
            toggleQuizModal={this.toggleQuizModal}
            forceRerender={this.props.forceRerender}
            quizIsNew={true}
          />
        }

        <div className="sidebar-whole">

          {/* All Media Options */}
          <div>
            <div className="button is-primary sidebar-btn"
              onClick={() => this.toggleAcitveTab(0)}>
              <span className="sidebar-category">Media</span>
            </div>

            {activeTab[0] &&
              <div className="sidebar-media-options options-container">
                <button className="button is-primary"
                onClick={() => { this.handleMediaModal(); this.setState({ mediaType: 'Audio' }) }}>
                    Audio
                </button>
                <button className="button is-primary"
                onClick={() => { this.handleMediaModal(); this.setState({ mediaType: 'Video' }) }}>
                    Video
                </button>
                <button className="button is-primary"
                onClick={() => { this.handleMediaModal(); this.setState({ mediaType: 'VR' }) }}>
                    VR
                </button>
              </div>
            }
          </div>

          {/* All Quiz Options */}
          <div>
            <div className="button is-warning sidebar-btn"
              onClick={() => this.toggleAcitveTab(1)}>
              <span className="sidebar-category">Quiz</span>
            </div>

            {activeTab[1] &&
              <div className="sidebar-quiz-options options-container">
                <button className="button is-warning multiple-choice-btn"
                  onClick={() => this.toggleQuizModal()}>
                    Multiple<br />
                    Choice
                </button>
              </div>
            }
          </div>

        </div>
      </div>
    )
  }
}

export default SideBar
