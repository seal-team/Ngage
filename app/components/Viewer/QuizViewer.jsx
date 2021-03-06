import React, { Component } from 'react'
import firebase from 'APP/fire'

import { getQuestion, getAnswers } from '../../helpers'

class QuizViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: {},
      correctAnswer: 0,
      selectedAnswer: 0,
      currentQuizResults: {},
      disabled: false
    }
  }

  componentDidMount() {
    const { presID, slideID } = this.props
    this.setState({
      question: getQuestion(presID, slideID),
      answers: getAnswers(presID, slideID)
    })

    firebase.database()
      .ref(`presentations/${presID}/slides/${slideID}/quiz-results`)
      .on('value', snapshot => {
        const currentQuizResults = snapshot.val()

        if (currentQuizResults) {
          this.setState(prevState => ({ currentQuizResults }))
        }
      })
  }

  submitAnswer = evt => {
    evt.preventDefault()
    const { presID, slideID } = this.props
      , { answers } = this.state
      , formData = evt.target
      , validation = []

    const quizResultsRef = firebase.database()
      .ref(`presentations/${presID}/slides/${slideID}/quiz-results`)
    
    answers.forEach((answer, i) => {
      const currentAnswer = `selected-answer-${i}`

      if (formData[currentAnswer].checked) {
        validation.push(answer)

        let currentAnswerPoll
        quizResultsRef.child(answer).once('value', snapshot => {
          currentAnswerPoll = snapshot.val()
        })
        quizResultsRef.child(answer).set(currentAnswerPoll + 1)
      }
    })

    if (!validation.length) {
      return alert('Must select at least one answer!')
    }
    // this.setState({disabled: true})
  }

  render() {
    const { question, answers } = this.state
    return (
      <div className="columns">
        <div className="column"></div>

        <div className="column is-two-thirds">
          <h1 className="title quiz-view-question">
            {question}
          </h1>

          <form onSubmit={this.submitAnswer}>
            <div className="quiz-view-answers">
              {answers && Object.keys(answers).map((answer, i) => (
                <div className="field is-grouped" key={i}>
                  <div className="control">
                    <input type="checkbox" name={`selected-answer-${i}`} />
                  </div>
                  <p className="subtitle quiz-view-answer">{answers[answer]}</p>
                </div>
              ))}
            </div>
            
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <button
                  className="button is-primary quiz-view-submit"
                  disabled={this.state.disabled}
                  onClick={() => console.log('disabling...')}
                  type="submit">
                  Submit Answer
                </button>
              </div>
              <div className="column"></div>
            </div>
          </form>
        </div>
        <div className="column"></div>
      </div>
    )
  }
}

export default QuizViewer
