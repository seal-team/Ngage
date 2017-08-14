import React, { Component } from 'react'
import firebase from 'APP/fire'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      slides: [],
      slidesCount: 0,
      presentationName: ""
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let currSlides = firebase.database()
                .ref('users')
                .child(user.uid)
                .child('presentations')
                .child(this.state.presentationName)
                .child('slides')
            currSlides.on('value', (snapshot) => {
              let items = snapshot.val()
            })
          }
      })
  }

  handleSubmit(e) {
      e.preventDefault()
      const user = firebase.auth().currentUser.uid
        //console.log('user', user)
      const currPresentation = firebase.database()
        .child('presentations')
      const item = {
          user: user,
          id: this.state.presentationName,

        }
      itemsRef.push(item)
      this.setState({
          newPresentation: '',
        })
    }

  render(){
    return (
      <div className='whoami'>
        <header>
          <div className='wrapper'>
            <h1>Presentation</h1>
          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <button onClick={this.handleSubmit}>Add Item</button>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
        <section className='display-item'>
          <div className="wrapper">
            <ul>
              {this.state.slides.map((slide) => {
                return (
                  <li key={slide.id}>
                    <h5>{slide}</h5>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
          )
  }
}
