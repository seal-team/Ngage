import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

class NewPresentationModal extends Component {
  constructor() {
    super()
    this.state = {
      newPresentation: '',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const usersRef = firebase.database()
      .ref('users')
      .child(this.props.user)

    const presentationsRef = firebase.database()
      .ref('presentations')

    const title = {
      title: this.state.newPresentation,
    }

    // add the new Presentation under the user
    const newPresent = usersRef.child('presentations').push(title)
    // get the key
    const newPresentKey = newPresent.key
    // add to the presentations
    presentationsRef.child(newPresentKey).set(title)
    presentationsRef.child(newPresentKey).child('userID').set(this.props.user)
    // set it as the active one
    usersRef.child('activePresentation').set(newPresentKey)
    // add a slide
    const newSlide = presentationsRef
      .child(newPresentKey)
      .child('slides')
      .push({ number: 1, type: 'quill' })

    const newSlideKey = newSlide.key
    firebase.database()
      .ref(`presentations/${newPresentKey}/active`)
      .set(newSlideKey)

    this.setState({ newPresentation: '' })
    this.props.handleModal()
    this.props.history.push(`/edit/${newPresentKey}/slide/${newSlideKey}`)
  }

  render() {
    return (
      <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <div className="field">
              <label className="label has-text-left">New Presentation</label>
              <div className="control">
                <input autoFocus
                  className="input"
                  type="text"
                  name="newPresentation"
                  placeholder="Enter Presentation Name"
                  onChange={this.handleChange}
                  value={this.state.newPresentation}
                />
              </div>
            </div>

            <div className="margin-top-sm">
              <button className="button is-primary"
                onClick={this.handleSubmit} >Create
              </button>
              <button className="button"
                onClick={() => this.props.handleModal()} >Close
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  auth: state.auth,
  user: state.user
})

export default withRouter(connect(mapState)(NewPresentationModal))
