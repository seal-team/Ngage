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
              
              <div className="column is-two-thirds">
                <div className="top-content center-text">
                  <a onClick={this.handleModal} className="button is-primary is-large create-btn">
                    Create Presentation
                  </a>

                  <h1 className="subtitle past-pres-title">Past Presentations</h1>
                  <div className="seperator"></div>
                </div>

                <div className='margin-top-xlg margin-left-sm'>
                  <ul>
                    {this.state.presentations.map((item) => (
                      <div key={item.id} className="list-item-container">
                        <li className="pres-list-item is-grouped">
                          <span className='margin-right-sm'>
                            <a onClick={() => this.handleLink('edit', `${item.id}`)}       
                              className="button is-small profile-btn">
                                <span className="icon">
                                  Edit<i className="fa fa-edit profile-icon"></i>
                                </span>
                            </a>
                            <a onClick={() => this.handleLink('view', `${item.id}`)} 
                              className="button is-small profile-btn">
                                <span className="icon">
                                  View<i className="fa fa-eye profile-icon"></i>
                                </span>
                            </a>
                          </span>
                          <span className="pres-name">
                            {item.title}
                          </span>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
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
