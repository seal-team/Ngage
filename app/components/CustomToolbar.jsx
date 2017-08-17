import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

export default class CustomToolbar extends React.Component {
  render() {
    return (
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
        <button className="ql-save" value='foo'>
          <span className="button is-small is-success">
            <span className="icon is-small">
              <i className="fa fa-check"></i>
            </span>
            <span>Save</span>
          </span>
        </button>
      </div>
    )
  }
}
