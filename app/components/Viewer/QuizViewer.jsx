import React, { Component } from 'react'
import firebase from 'APP/fire'

class QuizViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: [],
      correctAnswer: 0,
      selectedAnswer: 0
    }
    this.setSelectedAnswer = this.setSelectedAnswer.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  componentDidMount() {
    const { presID, slideID } = this.props
    const slide = firebase.database()
      .ref(`presentations/${presID}/slides/${slideID}/quiz-contents`)

    slide.child('question').once('value', snapshot => {
      const question = snapshot.val()
      this.setState({ question })
    })

    slide.child('answers').once('value', snapshot => {
      const answers = snapshot.val()
      this.setState({ answers })
    })
  }

  setSelectedAnswer(i) {

  }

  submitAnswer() {

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

          <div className="quiz-view-answers">
            {answers && answers.map((answer, i) => (
              <div className="quiz-view-answer field is-grouped" key={i}>
                <div className="control"
                  onClick={() => this.setSelectedAnswer(i)}>
                    <input type="radio" name="selected-answer" />
                </div>
                <p className="subtitle">{answer}</p>
              </div>
            ))}
          </div>

          <button className="button is-primary quiz-view-submit"
            onClick={() => console.log('blah')}>
              Submit
          </button>
        </div>
        <div className="column"></div>
      </div>
    )
  }
}

export default QuizViewer
