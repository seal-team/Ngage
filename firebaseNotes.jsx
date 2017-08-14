// creating a customers database

const db = firebase.database();
const customers = db.ref().child("customers");
const primaryKey = "customer_one"

customer.child(primaryKey).set({
    "firstName": "david",
    "lastName": "East",
    "location": "SF"
})


// creating a difference branch so that its not embedded

const db = firebase.database()
const events = db.child('events/fm');
const attendee = db.child('eventAttendee/fm');

events.on('value', snap => {
    // render data to HTML
})

attendees.on('child_added', snap => {
    // append attendees to list
})

//querying

//select a user by UID
const oneRef = rootRef.child('users').child('1')

// Find a user by email address
const twoRef = rootRef.child('users').orderByChild('email').equalTo('alice@email.com')

//limit to 10 users
const threeRef = rootRef.child('users').limitToFirst(10)

//get all users name that start with d
const fourRef = rootRef.child('users').orderByChild('age').startAt(51)

//joining tables in database

const rootRef = firebase.database().ref()
const attendees = db.child('eventAttendees/fm')

attendees.on('child_added', snap => {
    // append attendees to list
    // '1' -> 'David'
    let userRef = db.child('users/' + snap.key);
    userRef.once('value'). then(userSnap => {
        // anything you want to do with the users
    })

})

//to get all the attendees at a specific event

const eventKey = '-katakjsdflja'
const rootRef = firebase.database().ref()
const attendeesRef = rootRef.child('eventAttendees')
const usersRef = rootRef.child('users')

function getUsersAtEvent(key, cb) {
    attendeesRef.child(key).on('child_added', snap => {
        let userRef = usersRef.child(snap.key)
        userRef.once('value', cb)
    })
}


getUsersAtEvent(eventKey, snap => console.log(snap.val()));