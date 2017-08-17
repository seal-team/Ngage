import React, { Component } from 'react'

class NewQuizModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: [],
      numberOfAnswers: [null, null],
      correctAnswer: 0
    }

    this.submitNewQuiz = this.submitNewQuiz.bind(this)
    this.handleNumberOfAnswers = this.handleNumberOfAnswers.bind(this)
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this)
  }

  submitNewQuiz(evt) {
    evt.preventDefault()
    console.log('Submitting new quiz...', evt.target)

    const formData = evt.target
    console.log('\n\nquestion is  ', formData.question.value)

    // let correctAnswer = 0
    // for (let i = 0; i < this.state.numberOfAnswers.length; i++) {
    //   const answerName = `correct-answer-${i + 1}`
    //   if (formData.answerName.checked) correctAnswer = i
    // }
  }

  setCorrectAnswer(correctAnswer) {
    this.setState({ correctAnswer })
  }

  handleNumberOfAnswers(evt) {
    const numberOfAnswers = Array.apply(null, Array(+evt.target.value))
    this.setState({ numberOfAnswers })
  }

  render() {
    const exampleAnswers = ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <div className="field">
              <label className="label title add-new-quiz">Add New Quiz</label>

              <form onSubmit={this.submitNewQuiz}>
                <div className="field question-container">
                  <label className="label">Question</label>
                  <div className="control">
                    
                    <input className="input"
                      type="text"
                      name="question"
                      placeholder="ex. What is the largest city in North America by population?"
                    />
                  </div>
                </div>
                
                <div className="field is-grouped is-grouped-right answers-super-container">
                  <div className="num-of-answers-container field is-grouped">
                    <label className="label num-of-answers-title">Number of Answers</label>
                    <div className="control">
                      <div className="select">
                        <select onChange={this.handleNumberOfAnswers}>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <h1 className="subtitle correct-answer-title">
                    Select<br />
                    Correct<br />
                    Answer
                  </h1>
                </div>

                {this.state.numberOfAnswers.map((answer, i) => (
                  <div key={i}>
                    <label className="label">Answer #{i + 1}</label>
                    <div className="field is-grouped">
                      <div className="control">
                        <input className="input answer-input"
                          type="text"
                          name={`answer-${i + 1}`}
                          placeholder={`ex. ${exampleAnswers[i]}`}
                        />
                      </div>

                      <div className="control"
                        onClick={() => this.setCorrectAnswer(i + 1)}>
                        <input type="radio" name={`correct-answer-${i + 1}`} />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="field is-grouped is-grouped-centered quiz-btns">
                  <div className="control">
                    <button className="button is-primary"
                      type="submit">
                        Create
                    </button>
                  </div>

                  <div className="control">
                    <button className="button"
                      onClick={() => this.props.toggleQuizModal()}>
                        Cancel
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default NewQuizModal
