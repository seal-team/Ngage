import React, { Component } from 'react'
import firebase from 'APP/fire'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      slides: [],
      slidesCount: 0,
      uid: null
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({uid: user.uid})
            const activePresentation = firebase.database()
                .ref('users')
                .child(user.uid)
                .child('activePresentation')
            // activePresentation.on('value', (snapshot) => {
            //   let items = snapshot.val()
            // })
          } else {
            this.setState({uid: null})
      }
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const activePresentation = firebase.database()
        .ref('users')
        .child(this.state.uid)
        .child('activePresentation')
      const slides = firebase.database()
        .ref('presentation')
        .child(activePresentation)
        .child('slides')

      this.setState({ slidesCount: this.state.slidesCount++ })
      
      slides.child(this.state.slidesCount).set({})
  }

  render(){
    return (
      <div>
        <button onClick={this.handleSubmit}>+</button>
      </div>
    )
  }
}
