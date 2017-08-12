import React, { Component } from 'react'
import firebase from 'APP/fire'

// const users = firebase.database().ref('users')
// , nickname = uid => users.child(uid).child('nickname')

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      newPresentation: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const itemsRef = firebase.database().ref('users').child(user.uid).child('presentations')
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val()
          let newState = []
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
            })
          }
          console.log('items', items)
          this.setState({
            items: newState
          })
        })
      } else {
        this.setState({uid: null})
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = firebase.auth().currentUser.uid
    //console.log('user', user)
    const itemsRef = firebase.database().ref('users').child(user).child('presentations')
    const item = {
      title: this.state.newPresentation,
    }
    itemsRef.push(item)
    this.setState({
      newPresentation: '',
    })
  }

  render() {
    return (
      <div className='whoami'>
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
      </div>
    )
  }
}
