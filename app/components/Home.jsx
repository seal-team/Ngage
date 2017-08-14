import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import WhoAmI from './WhoAmI'

const auth = firebase.auth()
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      newPresentation: '',
      items: [],
      uid: null,
      modal: ''
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid })
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
        this.setState({ uid: null })
      }
    })
  }

  handleOpenModal = (e) => {
    this.setState({ modal: 'is-active' })
  }

  handleCloseModal = (e) => {
    this.setState({ modal: '' })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
      modal: ''
    })
    this.props.history.push(`/editor/${newPresentKey}`)
  }

  render() {
    return (
      <div className='whoami'>
        <WhoAmI auth={auth}/>
        {this.state.uid && <div>
          <div className='container is-fluid'>
            <div className='content has-text-centered'>
              <div className={`modal ${this.state.modal}`}>

                <div className="modal-background"></div>
                <div className="modal-card">
                  <section className="modal-card-body">

                    <div className="field">
                      <label className="label has-text-left">New Presentation</label>
                      <div className="control">
                        <input className="input" type="text" name="newPresentation" placeholder="Enter Name" onChange={this.handleChange} value={this.state.newPresentation}/>
                      </div>
                    </div>
                    <div className="margin-top-sm">
                      <button className="button is-primary"
                        onClick={this.handleSubmit} >Create
                      </button>
                      <button className="button"
                        onClick={this.handleCloseModal} >Close
                      </button>
                    </div>
                  </section>
                </div>
               </div>
              </div>
            </div>
            <section className='display-item'>
              <div className="columns">
                <div className="column"></div>
                <div className="column">
                  <a onClick={this.handleOpenModal} className="button is-primary is-large">Create Presentation</a>
                   <div className='margin-top-xlg margin-left-sm'><ul>
                    {this.state.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <Link to={`/editor/${item.id}`}>
                          {item.title}
                          </Link>
                        </li>
                      )
                    })}
                    </ul></div>
                  </div>
                  <div className="column"></div>
              </div>
            </section>
          </div>}
      </div>
    )
  }
}
