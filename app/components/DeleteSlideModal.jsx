import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class DeleteSlideModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const presentationsRef = firebase.database()
      .ref(`presentations/${this.props.presID}/slides/${this.props.selectedSlide}`)
    presentationsRef.remove()
    this.props.handleModal()
    this.props.history.push(`/edit/${this.props.presID}/slide/${this.props.gotoSlide}`)
  }

  render() {
    return (
      <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
        <h3 className="modal-title">This Will Permanently Delete Data. Are You Sure?</h3>
          <section className="modal-card-body center-text">
            <div className="margin-top-sm">
              <button className="button is-danger"
                onClick={this.handleSubmit} >Delete
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

export default withRouter(DeleteSlideModal)
