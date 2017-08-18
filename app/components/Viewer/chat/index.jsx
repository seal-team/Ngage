import React from 'react'
import { Route } from 'react-router-dom'
import firebase from 'APP/fire'
const db = firebase.database()
  , auth = firebase.auth()

import Chat from './Chat'

// This component is a little piece of glue between React router
// and our Scratchpad component. It takes in props.params.title, and
// shows the Scratchpad along with that title.
export default ({presentationID, disabled}) =>
  <div>
    {/* <h1>{presentationID}</h1> */}
    {/* Here, we're passing in a Firebase reference to
        /scratchpads/$scratchpadTitle. This is where the scratchpad is
        stored in Firebase. Each scratchpad is just a string that the
        component will listen to, but it could be the root of a more complex
        data structure if we wanted. */}
    {presentationID && <Chat auth={auth} disabled={disabled} fireRef={db.ref('chatrooms').child(presentationID)} />}
  </div>
