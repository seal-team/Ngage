import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

import CustomToolbar from './CustomToolbar'

class QuillComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorHtml: '',
      saving: '',
    }
  }

  componentDidMount() {
    console.log('didMount')
    this.attachQuillRefs()
    this.insertQuill()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  saveQuill = () => {
    this.setState({saving: 'is-loading'})
    const quillContents = this.quillRef.getContents()
    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(this.props.slideID)
    slideRef.child('quillContents').set(JSON.stringify(quillContents))
    setTimeout(() => { this.setState({saving: ''}) }, 1000)
  }

  insertQuill = () => {
    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(this.props.slideID)
    slideRef.once('value', (snapshot) => {
      const slide = snapshot.val()
      let setSlide=''
      if (slide && slide.quillContents) setSlide = JSON.parse(slide.quillContents)
      this.quillRef.setContents(setSlide)
    })
  }

  handleChange= (html) => {
    this.setState({ editorHtml: html })
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
    this.insertQuill()
    return (
      <div className="text-editor">
        <CustomToolbar saving = {this.state.saving} />
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={this.modules}
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
