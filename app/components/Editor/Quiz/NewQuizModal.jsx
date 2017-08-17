import React, { Component } from 'react'

class NewQuizModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Add New Quiz</label>

            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default NewQuizModal
