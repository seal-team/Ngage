import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class QuizCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfAnswers: [null, null]
    }

    this.submitNewQuiz = this.submitNewQuiz.bind(this)
    this.handleNumberOfAnswers = this.handleNumberOfAnswers.bind(this)
  }

  submitNewQuiz(evt) {
    evt.preventDefault()

    const formData = evt.target
    const question = formData.question.value
    if (!question.length) return alert('Cannot leave question blank!')

    let answers = [], correctAnswers = []
    for (let i = 0; i < this.state.numberOfAnswers.length; i++) {
      const answerName = `correct-answer-${i}`, answer = `answer-${i}`

      if (formData[answerName].checked) correctAnswers.push(formData[answer].value)

      if (!formData[answer].value.length) return alert('Cannot leave answer blank!')
      else answers.push(formData[answer].value)
    }
    if (!correctAnswers.length) return alert('Must select at least one correct answer!')

    const { presentationID, slideID } = this.props.match.params
    const slideRef = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}`)

    slideRef.child('type').set('quiz')

    slideRef.child('quiz-contents').set({
      question,
      answers,
      correctAnswers
    })

    // this.props.forceRerender()
    // this.props.toggleQuizModal()
  }

  handleNumberOfAnswers(evt) {
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

    let answers = []
    const quizAnswers = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/answers`)
      .once('value', snapshot => {
        answers.push(snapshot.val())
      })

    let correctAnswers = []
    const quizConnectedAnswer = firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/correctAnswers`)
      .once('value', snapshot => {
        answers.push(snapshot.val())
      })

    return (
      <form onSubmit={this.submitNewQuiz}>
        <div className="field question-container">
          <label className="label">Question</label>
          <div className="control">

            <input className="input"
              type="text"
              name="question"
              placeholder={question}
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
                  placeholder={`ex.`}
                />
              </div>

              <div className="control"
                onClick={() => console.log('set new correct answer')}>
                <input type="checkbox" name={`correct-answer-${i}`} />
              </div>
            </div>
          </div>
        ))}

        <div className="control">
          <button className="button is-primary"
            type="submit">
              Update Quiz
          </button>
        </div>

      </form>
    )
  }
}

export default withRouter(QuizCanvas)
