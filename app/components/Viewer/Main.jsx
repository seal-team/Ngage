import React from 'react'
// import SlideCanvas from './SlideCanvas'
import Chat from '../../../demos/chat'
import Scratchpad from '../../../demos/scratchpad'

class ViewerMain extends React.Component {
  constructor(props) {
      super(props)
      this.state = {

        }
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
                        this is chat
                        <Chat />
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
