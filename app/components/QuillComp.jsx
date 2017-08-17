import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

// const CustomButton = () => <span className="fa fa-edit" />
const CustomButton = () => <span className="button is-small is-success">
  <span className="icon is-small">
    <i className="fa fa-check"></i>
  </span>
  <span>Save</span>
</span>

// function insertStar(foo) {
//   console.log('foo', this)
//   const cursorPosition = this.quill.getSelection().index
//   this.quill.insertText(cursorPosition, '★')
//   this.quill.setSelection(cursorPosition + 1)
// }

function saveCanvas() {
  const quillContents = this.quill.getContents()
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-strike"></button>
    <button className="ql-blockquote"></button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <select className="ql-align"></select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-indent" value="+1"></button>
    <button className="ql-indent" value="-1"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button className="ql-link"></button>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
)

export default class QuillComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        'insertStar': function() {
          console.log('func', this.state)
        },
      }
    }
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={this.modules}
          formats={QuillComp.formats}
          theme={'snow'} // pass false to use minimal theme
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

// const foobar = 'foobar'
// QuillComp.modules = {
//   toolbar: {
//     container: '#toolbar',
//     handlers: {
//       'insertStar': function(foo) {
//         console.log('func', foobar)
//       },
//     }
//   }
// }

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
