import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import QuizModal from './QuizModal'
import { getQuestion, getAnswers, getCorrectAnswers } from '../../../getQuizData'

class QuizCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfAnswers: [null, null],
      quizModal: false
    }
  }

  toggleQuizModal = () => {
    this.setState({ quizModal: !this.state.quizModal })
  }

  handleNumberOfAnswers = evt => {
    const numberOfAnswers = Array.apply(null, Array(+evt.target.value))
    this.setState({ numberOfAnswers })
  }

  render() {
    const { presentationID, slideID } = this.props.match.params

    const quizQuestion = getQuestion(presentationID, slideID)
    const quizAnswers = getAnswers(presentationID, slideID)
    const quizCorrectAnswers = getCorrectAnswers(presentationID, slideID)
    
    return (
      <div className="edit-mode-quiz-canvas-container">
        
        <div className="edit-mode-quiz-title-container">
          <span className="title edit-mode-quiz-title">Quiz</span>

          <button className="button is-warning"
            onClick={() => this.props.toggleQuizModal(false)}>
            Modify
          </button>
        </div>

        <h1 className="subtitle edit-mode-question">
          {quizQuestion}
        </h1>

        {quizAnswers.map((answer, i) => (
          <div key={i} className="edit-mode-answer-container">
            <span className="edit-mode-answer-nums">{i + 1}) </span>
            <span className="edit-mode-quiz-answer">
              {answer}
            </span>
          </div>
        ))}

        <h1 className="subtitle edit-mode-correct-answer-title">
          Correct Answer(s):
        </h1>

        {quizCorrectAnswers.map((correctAnswer, i) => (
          <h1 key={i} className="edit-mode-quiz-correct-answer">
            - {correctAnswer}
          </h1>
        ))}

      </div>
    )
  }
}

export default withRouter(QuizCanvas)
