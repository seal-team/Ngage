import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class VRComp extends Component {
  popUp= () => {
    window.open(`../../../VR component/VRindex.html?${this.props.obj}?${this.props.mtl}`)
  }
  render() {
    return (
      <div className = 'VR-slide-positon'>
        <button className="button is-primary" onClick={this.popUp}>Switch to VR </button>
        <br/>
        {this.props.description}
      </div>
    )
  }
}
export default withRouter(VRComp)
