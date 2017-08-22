import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import firebase from 'APP/fire'

import { getAnswers } from '../../helpers'

const testData = [
  {answer: 'Pizza', poll: 8},
  {answer: 'Spagetti', poll: 11},
  {answer: 'Tacos', poll: 4},
  {answer: 'Sushi', poll: 23},
  {answer: 'Beer', poll: 31}
]

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      pollData: []
    }
  }

  componentDidMount() {
    const { presentationID, slideID } = this.props.match.params
    this.setState({
      answers: getAnswers(presentationID, slideID)
    })

    firebase.database()
      .ref(`presentations/${presentationID}/slides/${slideID}/quiz-results`)
      .on('value', snapshot => {
        const pollData = snapshot.val()

        if (pollData) {
          this.setState(prevState => ({ pollData }))
        }
      })
  }

  render() {
    console.log('state in graph', this.state)
    
    return (
      <div>
        <BarChart
          data={testData}
          width={500}
          height={200}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="answer" />
            <YAxis dataKey="poll" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip/>
            <Bar type="monotone" dataKey="poll" fill="#8884d8" />
        </BarChart>
      </div>
    )
  }
}

export default withRouter(Graph)