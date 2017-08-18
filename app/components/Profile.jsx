import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

import WhoAmI from './WhoAmI'
import NewPresentationModal from './NewPresentationModal'

class Profile extends Component {
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

  handleLink = (action, id) => {
    const slide = firebase.database()
      .ref('presentations')
      .child(id)
      .child('slides')
    slide.limitToFirst(1).once('value', (snapshot) => {
      const slide1 = snapshot.val()
      const firstSlide = Object.keys(slide1)[0]
      this.props.history.push(`/${action}/${id}/slide/${firstSlide}`)
    })
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
          for (const presentation in presentations) {
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
    const user = this.props.user
    return (
      <div className='whoami'>
        {user && <div>
          {this.state.showModal
            && <NewPresentationModal handleModal={this.handleModal} />
          }
          <section className='display-item'>
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <a onClick={this.handleModal} className="button is-primary is-large">Create Presentation</a>
                <div className='margin-top-xlg margin-left-sm'><ul>
                  {this.state.presentations.map((item) => (
                    <li key={item.id}>
                      <span className='margin-right-sm'>
                        <a onClick={() => this.handleLink('edit', `${item.id}`)} className="button is-small">
                          <span className="icon is-small">
                            <i className="fa fa-edit"></i>
                          </span>
                        </a>
                        <a onClick={() => this.handleLink('view', `${item.id}`)} className="button is-small">
                          <span className="icon is-small">
                            <i className="fa fa-eye"></i>
                          </span>
                        </a>
                      </span>
                      {item.title}
                    </li>
                  ))}
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

const mapState = (state, componentProps) => ({
  user: state.user
})

export default withRouter(connect(mapState)(Profile))
