import React, { Component } from 'react'
import firebase from 'APP/fire'

// const users = firebase.database().ref('users')
// , nickname = uid => users.child(uid).child('nickname')

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      newPresentation: '',
      items: [],
      uid: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid})
        const usersRef = firebase.database()
          .ref('users')
          .child(user.uid)
          .child('presentations')
        usersRef.on('value', (snapshot) => {
          const items = snapshot.val()
          const newState = []
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
            })
          }
          this.setState({
            items: newState
          })
        })
      } else {
        this.setState({uid: null})
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const usersRef = firebase.database()
      .ref('users')
      .child(this.state.uid)
    const presentationsRef = firebase.database()
      .ref('presentations')
    const item = {
      title: this.state.newPresentation,
    }
    // add the new Presentation under the user
    const newPresent = usersRef.child('presentations').push(item)
    // get the key
    const newPresentKey = newPresent.key
    // add to the presentations
    presentationsRef.child(newPresentKey).set(item)
    // set it as the active one
    usersRef.child('activePresentation').set(newPresentKey)

    this.setState({
      newPresentation: '',
    })
  }

  render() {
    return (
      <div className='whoami'>
      {this.state.uid && <div>
        <header>
          <div className='wrapper'>
              <h1>Create Presentation</h1>
          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="newPresentation" placeholder="Presentation Name" onChange={this.handleChange} value={this.state.newPresentation} />
              <button>Add Item</button>
            </form>
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
              {this.state.items.map((item) => {
                return (
                  <li key={item.id}>
                    <h5>{item.title}</h5>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>}
      </div>
    )
  }
}
