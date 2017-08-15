import React, { Component } from 'react'
// import SlideCanvas from './SlideCanvas'
import Chat from './chat'
import Scratchpad from './scratchpad'

class ViewerMain extends Component {
  constructor() {
    super()
    this.state = {
      presentationID: '',
    }
  }

  componentDidMount(props) {
    const presentationID = this.props.match.params.presentationID
    this.setState({ presentationID })
  }

  render() {
    return (
        <div className="viewer-main-container">
            <div className="section columns slide-and-chat">
                <div className="slide is-mobile column is-9">
                    this is slide
                    {/* <SlideCanvas /> */}
                </div>
                <div className="chat is-mobile column is-3">
                    <h2>Chat</h2>
                    <Chat presentationID={this.state.presentationID}/>
                </div>
            </div>
            <div className="scratchpad-and-graph section columns">
                <div className="slide is-mobile column is-9">
                    this is scratchpad
                    <Scratchpad />
                </div>
                <div className="graph is-mobile column is-3">
                    this is graph
                    {/* <Graph /> */}
                </div>
            </div>
        </div>
    )
  }
}
export default ViewerMain
