/* global $ */

import React from 'react'
import firebase from 'APP/fire'
import ignite, { withAuth, FireInput } from './ignite'
import { Scrollbars } from 'react-custom-scrollbars'

const users = firebase.database().ref('users')
  , nickname = uid => users.child(uid).child('nickname')

const Nickname = ignite(
  ({ value }) => <span className='chat-message-nick column is-2 margin-right-sm'>{value}: </span>
)

const ChatMessage = ignite(
  ({ value }) => {
    if (!value) return null
    const { from, body } = value
    return <div className='chat-message columns'>
      <Nickname fireRef={nickname(from)} />
      <span className='chat-message-body auto column'>{body}</span>
    </div>
  }
)

export default ignite(withAuth(class extends React.Component {
  constructor() {
    super()
    this.state = {
      body: '',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendMessage = event => {
    event.preventDefault()
    if (!this.props.fireRef) return
    this.props.fireRef.push({
      from: firebase.auth().currentUser.uid,
      body: event.target.body.value
    })
    this.setState({ body: '' })
  }

  renderSendMsg(user) {
    if (!user) {
      return <span>You must be logged in to send messages.</span>
    }
    return (
      <form className="chat-form"
        onSubmit={this.sendMessage}>
          <input className="chat-input column is-12 margin-tobbottom-sm" name='body' onChange={this.handleChange} value={this.state.body} />
          <span><strong>Nickname: </strong></span>
          <span>
            <FireInput fireRef={nickname(user.uid)} />
            <input className='button is-primary is-small margin-left-sm' type='submit' id='sDiv1' />
          </span>
      </form>
    )
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom =() => {
    $('#chat-log').animate({scrollTop: 9999}, 1000)
  }

  render() {
    const { user, snapshot, asEntries, presentationID } = this.props
      , messages = asEntries(snapshot)
    return <div>
      <div id='chat-log' ref={`chatscroll`}> {
          messages.map(({ key, fireRef }) => <ChatMessage key={key} fireRef={fireRef} />)
        }
     </div>
      {this.renderSendMsg(user)}
    </div >
  }
}))
