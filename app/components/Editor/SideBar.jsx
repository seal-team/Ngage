import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MediaModal from './Media/MediaModal'
import Uploader from './Media/Uploader'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: [false, false, false, false],
      uid: null,
      mediaType: 'what the shit',
      mediaModal: false,
      updateModal: false,
    }
    this.toggleAcitveTab = this.toggleAcitveTab.bind(this)
  }

  handleMediaModal = (e) => {
    this.setState({ mediaModal: !this.state.mediaModal })
  }
  handleUpdateModal = (e) => {
    this.setState({ updateModal: !this.state.updateModal })
  }

  toggleAcitveTab(index) {
    const activeState = [...this.state.activeTab]
      .map((item, i) => i === index || false)

    this.setState({ activeTab: activeState })
  }

  render() {
    const activeTab = this.state.activeTab

    return (
      <div>
        {this.state.mediaModal && <MediaModal handleModal={this.handleMediaModal} handleUpdateModal={this.handleUpdateModal} uid={this.state.uid} history={this.props.history} mediaType={this.state.mediaType} />}
        {this.state.updateModal && <Uploader handleUpdateModal={this.handleUpdateModal} uid={this.state.uid} history={this.props.history} mediaType={this.state.mediaType} />}
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
                <p onClick={() => { this.handleMediaModal(); this.setState({ mediaType: 'Audio' }) }}>Audio</p>
                <p onClick={() => { this.handleMediaModal(); this.setState({ mediaType: 'Video' }) }}>Video</p>
                <p onClick={() => { this.handleMediaModal(); this.setState({ mediaType: 'VR' }) }}>VR</p>
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
                <p>Multiple Choice</p>
                <p>Poll</p>
              </div>
            }
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(SideBar)
