import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

export default class CustomToolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        <span className="ql-formats">
        <select className="ql-size"></select>
        <select className="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option selected></option>
        </select>
        <select className="ql-font"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <select className="ql-align">
            <option selected></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
          <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          { /* <button className="ql-code-block"></button> */ }
          <button className="ql-video"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-save" value='test'>
            <span className={`button is-small is-success ${this.props.saving}`}>
              <span className="icon is-small">
                <i className="fa fa-check"></i>
              </span>
              <span>Save</span>
            </span>
          </button>
        </span>
      </div>
    )
  }
}
