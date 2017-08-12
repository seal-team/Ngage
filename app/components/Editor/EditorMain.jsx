import React, { Component } from 'react'

import SlideCanvas from './SlideCanvas'
import PropertiesBar from './PropertiesBar'
import SideBar from './SideBar'
import Timeline from './Timeline'

class EditorMain extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="editor-main-container columns">
        
        <div className="column">
          <SideBar />
        </div>

        <div className="column">
          <PropertiesBar />
          <SlideCanvas />
        </div>

        <Timeline />

      </div>
    )
  }
}

export default EditorMain
