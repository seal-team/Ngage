import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'
import { ImageResize } from 'quill-image-resize-module'

Quill.register('modules/imageResize', ImageResize)
const Delta = ReactQuill.Quill.import('delta')
let change = new Delta()

import CustomToolbar from './CustomToolbar'

class QuillComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorHtml: '',
      saving: '',
    }

    this.props.history.listen((location, action) => {
      if (change.length() > 0) {
        this.saveQuill(false)
      }
    })
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.insertQuill()
    const saveInterval = setInterval(this.saveQuill(false), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.saveInterval)
  }

  componentDidUpdate(prevProps) {
    this.attachQuillRefs()

    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }

    this.quillRef.on('text-change', function(delta) {
      change = change.compose(delta)
    })
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

  saveQuill = (updateButton) => {
    const { presentationID, slideID } = this.props.match.params
    console.log('saving', slideID, 'updatebutton', updateButton)
    updateButton && this.setState({saving: 'is-loading'})
    const quillContents = this.quillRef.getContents()

    const slideRef = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}`)
    slideRef.once('value')
      .then((snapshot) => {
        if (snapshot.val().type === 'quill') {
          slideRef.child('quillContents').set(JSON.stringify(quillContents))
        }
      })

    updateButton && setTimeout(() => { this.setState({saving: ''}) }, 500)
  }

  insertQuill = () => {
    const { presentationID, slideID } = this.props.match.params

    firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}`)
      .once('value', (snapshot) => {
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
    },
    imageResize: {
      displaySize: true
    }
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar saving={this.state.saving} />
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          onChange={this.handleChange}
          placeholder='Add text or images'
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

export default withRouter(QuillComp)
