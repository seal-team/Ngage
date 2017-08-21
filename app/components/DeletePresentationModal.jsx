import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class DeletePresentationModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const deletes = {
      [`presentations/${this.props.presentationID}`]: null,
      [`users/${this.props.uid}/presentations/${this.props.presentationID}`]: null
    }
    firebase.database().ref('/').update(deletes)
      .catch(err => console.log('err', err))

    this.props.handleDeleteModal()
  }

  render() {
    return (
      <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
        <h3 className="modal-title">This Will Permanently Delete Your Presentation. Are You Sure?</h3>
          <section className="modal-card-body center-text">
            <div className="margin-top-sm">
              <button className="button is-danger"
                onClick={this.handleSubmit} >Delete
              </button>
              <button className="button"
                onClick={() => this.props.handleDeleteModal()} >Close
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(DeletePresentationModal)
