import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import firebase from 'APP/fire'

import { getAnswers } from '../../helpers'

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphData: []
    }
  }

  componentDidMount() {
    const { presentationID } = this.props.match.params
    const { activeSlideID } = this.props

    firebase.database()
      .ref(`presentations/${presentationID}/slides/${activeSlideID}/quiz-results`)
      .on('value', snapshot => {
        const pollData = snapshot.val(), graphData = []
        
        for (let answer in pollData) {
          graphData.push({ answer: answer, poll: pollData[answer] })
        }

        this.setState(prevState => ({ graphData }))
      })
  }

  

  render() {
    const { graphData } = this.state

    return (
      <BarChart
        data={graphData}
        width={500}
        height={200}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey="answer" />
          <YAxis dataKey="poll" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip/>
          <Bar type="monotone" dataKey="poll" fill="#8884d8" />
      </BarChart>
    )
  }
}

export default withRouter(Graph)