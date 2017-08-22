import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class DeleteSlideModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const deletes = {
      [`presentations/${this.props.presentationID}/slides/${this.props.slideID}`]: null
    }
    firebase.database().ref('/').update(deletes)
      .then(() => {
        this.props.handleModal()
        this.props.history.push(`/edit/${this.props.presentationID}/slide/${this.props.deleteGoTo}`)
        this.props.sortSlides()
      })
      .catch(err => console.log('err', err))
  }

  render() {
    return (
      <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
        <h3 className="modal-title">This Will Permanently Delete Your Slide. Are You Sure?</h3>
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
