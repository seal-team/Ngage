import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import firebase from 'APP/fire'

class PropertiesBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    console.log('bar', this.props.match.params.presentationID)
    const presentRef = firebase.database()
      .ref('presentations')
      .child(this.props.match.params.presentationID)
      .child('title')
    presentRef.on('value', (snapshot) => {
      const title = snapshot.val()
      this.setState({title})
    })
  }

  render() {
    return (
      <div className="">
        <div className="button is-primary sidebar-btn">
          <span className="sidebar-category"> {this.state.title} </span>
        </div>
      </div>
    )
  }
}

export default withRouter(PropertiesBar)
