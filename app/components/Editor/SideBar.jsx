import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: [false, false, false, false]
    }
    this.toggleAcitveTab = this.toggleAcitveTab.bind(this)
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
        <div className="sidebar-whole">


          {/* All Text Options */}
          <div>
            <div className="button is-info sidebar-btn"
              onClick={() => this.toggleAcitveTab(0)}>
              <span className="sidebar-category">Text</span>
            </div>

            {activeTab[0] &&
              <div className="text-options result-link-container">
                <p>Text Box</p>
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
              <div className="sof-results result-link-container">
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
              <div className="w3c-results result-link-container">
                <p>Audio</p>
                <p>Video</p>
                <p>VR</p>
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
              <div className="w3c-results result-link-container">
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
