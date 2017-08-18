import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MediaModal from './Media/MediaModal'
import VRUploader from './Media/VRUploader'
import Uploader from './Media/Uploader'
import NewQuizModal from './Quiz/NewQuizModal'


class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: [false, false, false, false],
      uid: null,
      mediaType: '',
      mediaModal: false,
      updateModal: false,
      quizModal: false
    }

    this.toggleAcitveTab = this.toggleAcitveTab.bind(this)
    this.handleMediaModal = this.handleMediaModal.bind(this)
    this.handleUpdateModal = this.handleUpdateModal.bind(this)
    this.toggleQuizModal = this.toggleQuizModal.bind(this)
  }

  handleMediaModal(mediaType) {
    this.setState({ mediaType })
    this.setState({ mediaModal: !this.state.mediaModal })
  }

  handleUpdateModal() {
    this.setState({ updateModal: !this.state.updateModal })
  }

  toggleQuizModal() {
    this.setState({ quizModal: !this.state.quizModal })
  }

  toggleAcitveTab(index) {
    const activeState = [...this.state.activeTab]
      .map((item, i) => i === index || false)

    this.setState({ activeTab: activeState })
  }

  render() {
    const activeTab = this.state.activeTab
    const mediaType = this.state.mediaType

    console.log('sidebar props', this.props)
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

        {this.state.updateModal &&
          <Uploader
            handleUpdateModal={this.handleUpdateModal}
            mediaType={mediaType}
          />
        }

        {this.state.quizModal &&
          <NewQuizModal
            toggleQuizModal={this.toggleQuizModal}
            forceRerender={this.props.forceRerender}
          />
        }

        <div className="sidebar-whole">

          {/* All Text Options */}
          <div>
            <div className="button is-info sidebar-btn"
              onClick={() => this.toggleAcitveTab(0)}>
              <span className="sidebar-category">Text</span>
            </div>

            {activeTab[0] &&
              <div className="sidebar-text-options options-container">
                <p>Text Box</p>
                <p>Bullet Points</p>
              </div>
            }
          </div>

          {/* All Shape Options */}
          <div>
            <div className="button is-danger sidebar-btn"
              onClick={() => this.toggleAcitveTab(1)}>
              <span className="sidebar-category">Shape</span>
            </div>

            {activeTab[1] &&
              <div className="sidebar-shape-options options-container">
                <p>Rectangle</p>
                <p>Circle</p>
              </div>
            }
          </div>

          {/* All Media Options */}
          <div>
            <div className="button is-primary sidebar-btn"
              onClick={() => this.toggleAcitveTab(2)}>
              <span className="sidebar-category">Media</span>
            </div>

            {activeTab[2] &&
              <div className="sidebar-media-options options-container">
                <button className="button is-primary"
                  onClick={() => this.handleMediaModal('Audio')}>
                    Audio
                </button>
                <button className="button is-primary"
                  onClick={() => this.handleMediaModal('Video')}>
                    Video
                </button>
                <button className="button is-primary"
                  onClick={() => this.handleMediaModal('VR')}>
                    VR
                </button>
              </div>
            }
          </div>

          {/* All Quiz Options */}
          <div>
            <div className="button is-warning sidebar-btn"
              onClick={() => this.toggleAcitveTab(3)}>
              <span className="sidebar-category">Quiz</span>
            </div>

            {activeTab[3] &&
              <div className="sidebar-quiz-options options-container">
                <button className="button is-warning multiple-choice-btn"
                  onClick={() => this.toggleQuizModal()}>
                    Multiple<br />Choice
                </button>
                <button className="button is-warning">Poll</button>
              </div>
            }
          </div>

        </div>
      </div>
    )
  }
}

export default SideBar
