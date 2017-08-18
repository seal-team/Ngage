import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class NewQuizModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfAnswers: [null, null]
    }

    this.submitNewQuiz = this.submitNewQuiz.bind(this)
    this.handleNumberOfAnswers = this.handleNumberOfAnswers.bind(this)
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this)
  }

  submitNewQuiz(evt) {
    evt.preventDefault()

    const formData = evt.target
    const question = formData.question.value
    if (!question.length) return alert('Cannot leave question blank!')

    let answers = [], correctAnswers = []
    for (let i = 0; i < this.state.numberOfAnswers.length; i++) {
      const answerName = `correct-answer-${i}`, answer = `answer-${i}`
      
      // if (formData[answerName].checked) correctAnswers.push(formData[answer].value)
      if (formData[answerName].checked) correctAnswers.push(i)
      
      if (!formData[answer].value.length) return alert('Cannot leave answer blank!')
      else answers.push(formData[answer].value)
    }
    if (!correctAnswers.length) return alert('Must select at least one correct answer!')

    const slideRef = firebase.database()
      .ref('presentations')
      .child(this.props.match.params.presentationID)
      .child('slides')
      .child(this.props.match.params.slideID)

    slideRef.child('type').set('quiz')

    slideRef.child('quiz-contents').set({
      question,
      answers,
      correctAnswers
    })

    this.props.forceRerender()
    this.props.toggleQuizModal()
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
                    Answer(s)
                  </h1>
                </div>

                {this.state.numberOfAnswers.map((answer, i) => (
                  <div key={i}>
                    <label className="label">Answer #{i + 1}</label>
                    <div className="field is-grouped">
                      <div className="control">
                        <input className="input answer-input"
                          type="text"
                          name={`answer-${i}`}
                          placeholder={`ex. ${exampleAnswers[i]}`}
                        />
                      </div>

                      <div className="control"
                        onClick={() => this.setCorrectAnswer(i + 1)}>
                        <input type="checkbox" name={`correct-answer-${i}`} />
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

export default withRouter(NewQuizModal)
