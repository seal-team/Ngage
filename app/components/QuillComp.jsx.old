import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6
import theme from 'react-quill/dist/quill.snow.css'

// import Quill from 'quill/core/quill'
// import Toolbar from 'quill/modules/toolbar'
// import Snow from 'quill/themes/snow'

class QuillComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html })
  }

  render() {
    return (
      <ReactQuill
        theme='snow'
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={QuillComp.modules}
        formats={QuillComp.formats}
        bounds={'.app'}
        placeholder={this.props.placeholder}>
          <div className="my-editing-area"/>
      </ReactQuill>
    )
  }
}

QuillComp.modules = {
  toolbar: [
    [{'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'align': [] }],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ]
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

export default QuillComp
