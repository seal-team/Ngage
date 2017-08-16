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

  componentDidMount() {
    const user = this.props.user

    const usersRef = firebase.database()
      .ref('users')
      .child(user)
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

      this.setState({ presentations: newState })
    })
  }

  render() {
    const user = this.props.user
    return (
      <div className='whoami'>
        {auth && <div>
          {this.state.showModal 
            && <NewPresentationModal handleModal={this.handleModal} />
          }
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
                          <Link to={`/edit/${item.id}`}>
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

const mapState = (state, componentProps) => ({
  user: state.user
})

export default withRouter(connect(mapState)(Profile))
