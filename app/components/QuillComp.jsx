import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

import CustomToolbar from './CustomToolbar'

export default class QuillComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '' }
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.insertText()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }

  saveQuill = () =>{
    const quillContents = this.quillRef.getContents()
    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(this.props.slideID)
    slideRef.child('quillContents').set(JSON.stringify(quillContents))
  }

  insertText = () => {
    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.presID)
      .child('slides')
      .child(this.props.slideID)
    slideRef.once('value', (snapshot) => {
      const slide = snapshot.val()
      this.quillRef.setContents(JSON.parse(slide.quillContents))
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
    return (
      <div className="text-editor">
        <CustomToolbar />
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

/*
ReactDOM.render(
  <QuillComp placeholder={'Write something or insert a star ★'}/>,
  document.querySelector('.app')
)
*/
