import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

class QuillComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.insertQuill()
  }

  componentDidUpdate(prevProps) {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  insertQuill = () => {
    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.match.params.presentationID)
      .child('slides')
      .child(this.props.slideID)
    slideRef.once('value', (snapshot) => {
      const slide = snapshot.val()
      let setSlide=''
      if (slide && slide.quillContents) setSlide = JSON.parse(slide.quillContents)
      this.quillRef.setContents(setSlide)
    })
  }

  modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        'save': this.saveQuill
      }
    }
  }

  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          readOnly='true'
          formats={QuillComp.formats}
          theme={'snow'}
        >
          <div
            key="editor"
            ref="editor"
            className="quill-contents"
          />
        </ReactQuill>
      </div>
    )
  }
}

QuillComp.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'align',
  'link', 'image', 'video', 'background', 'color'
]

QuillComp.propTypes = {
  placeholder: React.PropTypes.string,
}

export default withRouter(QuillComp)
