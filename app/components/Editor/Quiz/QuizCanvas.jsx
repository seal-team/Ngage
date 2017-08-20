import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

import QuizModal from './QuizModal'

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
    // const exampleAnswers = ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    const { presentationID, slideID } = this.props.match.params

    let question = ''
    const quizQuestion = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/question`)
      .once('value', snapshot => {
        question = snapshot.val()
      })

    const answers = []
    const quizAnswers = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/answers`)
      .once('value', snapshot => {
        answers.push(snapshot.val())
      })

    const correctAnswers = []
    const quizConnectedAnswer = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/correctAnswers`)
      .once('value', snapshot => {
        correctAnswers.push(snapshot.val())
      })
    
    console.log('quiz canvas props', this.props)

    return (
      <div>
        {this.state.quizModal &&
          <QuizModal
            toggleQuizModal={this.toggleQuizModal}
            quizIsNew={false}
            // forceRerender={this.props.forceRerender}
          />
        }

        <div className="edit-mode-quiz-canvas-container">
          
          <div className="edit-mode-quiz-title-container">
            <span className="title edit-mode-quiz-title">Quiz</span>

            <button className="button is-warning"
              onClick={() => this.toggleQuizModal()}>
              Modify
            </button>
          </div>

          <h1 className="subtitle">{question}</h1>

          {this.state.numberOfAnswers.map((answer, i) => (
            <div key={i}>
              <h1>Answer #{i + 1}</h1>
            </div>
          ))}

          <h1 className="subtitle edit-mode-correct-answer-title">
            Correct Answer(s):
          </h1>

        </div>
      </div>
    )
  }
}

export default withRouter(QuizCanvas)
