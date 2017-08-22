import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import {
  getQuestion,
  getAnswers,
  getCorrectAnswers,
  generateRandomQuiz
} from '../../../helpers'

class QuizModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfAnswers: [null, null]
    }
  }

  submitOrUpdateQuiz = evt => {
    evt.preventDefault()
    const formData = evt.target
    const question = formData.question.value

    if (!question.length) return alert('Cannot leave question blank!')

    let answers = [], correctAnswers = []
    for (let i = 0; i < this.state.numberOfAnswers.length; i++) {
      const correctAnswer = `correct-answer-${i}`, answer = `answer-${i}`
      
      if (formData[correctAnswer].checked) {
        correctAnswers.push(formData[answer].value)
      }
      
      if (!formData[answer].value.length) {
        return alert('Cannot leave answer blank!')
      } else {
        answers.push(formData[answer].value)
      }
    }

    if (!correctAnswers.length) {
      return alert('Must select at least one correct answer!')
    }

    const { presentationID, slideID } = this.props.match.params
    const slideRef = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}`)

    slideRef.child('type').set('quiz')

    slideRef.child('quiz-contents').set({
      question,
      answers,
      correctAnswers
    })

    answers.forEach(answer => {
      slideRef.child('quiz-results').child(answer).set(0)
    })

    this.props.toggleQuizModal()
  }

  setCorrectAnswer = correctAnswer => {
    this.setState({ correctAnswer })
  }

  handleNumberOfAnswers = evt => {
    const numberOfAnswers = Array.apply(null, Array(+evt.target.value))
    this.setState({ numberOfAnswers })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params
    const quizIsNew = this.props.quizIsNew
    
    const quizQuestion = !quizIsNew && getQuestion(presentationID, slideID)
    const quizAnswers = !quizIsNew && getAnswers(presentationID, slideID)
    const quizCorrectAnswers = !quizIsNew && getCorrectAnswers(presentationID, slideID)

    // fix bugs in modifying quiz
    // - if current quiz data set to input value, becomes uneditable

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <div className="field">
              <label className="label title add-new-quiz">
                {quizIsNew ? 'Add New Quiz' : 'Modify Quiz'}
              </label>

              <form onSubmit={this.submitOrUpdateQuiz}>
                <div className="field question-container">
                  <label className="label">Question</label>
                  <div className="control">
                    {quizIsNew
                      ? <input autoFocus
                          className="input"
                          type="text"
                          name="question"
                          placeholder={`ex. ${generateRandomQuiz().question}`}
                        />
                      : <input autoFocus
                          className="input"
                          type="text"
                          name="question"
                          placeholder={quizQuestion}
                        />
                    }
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
                        {quizIsNew
                          ? <input className="input answer-input"
                              type="text"
                              name={`answer-${i}`}
                              placeholder={`ex. ${generateRandomQuiz().answers[i]}`}
                            />
                          : <input className="input answer-input"
                              type="text"
                              name={`answer-${i}`}
                              placeholder={quizAnswers[i]}
                            />
                        }
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
                        {quizIsNew ? 'Create' : 'Update'}
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

export default withRouter(QuizModal)
