import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'

import WhoAmI from './WhoAmI'
import NewPresentationModal from './NewPresentationModal'

const auth = firebase.auth()
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export default class extends Component {
  constructor() {
    super()
    this.state = {
      presentations: [],
      uid: null,
      showModal: false
    }
  }

  handleModal = (e) => {
    this.setState({ showModal: !this.state.showModal })
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
          const presentations = snapshot.val()
          const newState = []
          for (let presentation in presentations) {
            newState.push({
              id: presentation,
              title: presentations[presentation].title,
            })
          }
          this.setState({
            presentations: newState
          })
        })
      } else {
        this.setState({ uid: null })
      }
    })
  }

  render() {
    return (
      <div className='whoami'>
        <WhoAmI auth={auth}/>
        {this.state.uid && <div>
          {this.state.showModal && <NewPresentationModal handleModal={this.handleModal} uid={this.state.uid} history={this.props.history} />}
          <section className='display-item'>
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <a onClick={this.handleModal} className="button is-primary is-large">Create Presentation</a>
                  <div className='margin-top-xlg margin-left-sm'><ul>
                  {this.state.presentations.map((item) => {
                    return (
                      <li key={item.id}>
                        <span className='margin-right-sm'>
                          <Link to={`/editor/${item.id}`}>
                            <a className="button is-small">
                            <span className="icon is-small">
                            <i className="fa fa-edit"></i>
                            </span>
                            </a>
                          </Link>
                          <Link to={`/view/${item.id}`}>
                          <a className="button is-small">
                            <span className="icon is-small">
                            <i className="fa fa-eye"></i>
                            </span>
                          </a>
                          </Link>
                        </span>
                        {item.title}
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
