import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

import CustomToolbar from '../Editor/CustomToolbar'

class QuillComp extends React.Component {
  componentDidMount() {
    this.attachQuillRefs()
    this.insertQuill()
  }

  componentDidUpdate(prevProps) {
    this.attachQuillRefs()
    if (this.props.slideID !== prevProps.slideID) {
      this.onRouteChanged()
    }
  }

  static propTypes = {
    location: React.PropTypes.object.isRequired
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  onRouteChanged() {
    this.insertQuill()
  }

  insertQuill = () => {
    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.match.params.presentationID)
      .child('slides')
      .child(this.props.slideID)
    slideRef.on('value', (snapshot) => {
      const slide = snapshot.val()
      let setSlide=''
      if (slide && slide.quillContents) setSlide = JSON.parse(slide.quillContents)
      this.quillRef.setContents(setSlide)
    })
  }

  modules = {
    toolbar: false
  }

  render() {
    return (
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          modules={this.modules}
          readOnly={true}
          >
        </ReactQuill>
    )
  }
}




export default withRouter(QuillComp)
