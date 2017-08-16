import firebase from 'APP/fire'

const GET_USER = 'GET_USER'
export const getUser = user => ({
  type: GET_USER,
  user
})

export const fetchUser = user =>
  dispatch => dispatch(getUser(user))


const initialState = {
  user: {},
  auth: firebase.auth()
}

const reducer = (state=initialState, action) => {
  let newState = Object.assign({}, state)

  switch(action.type) {
    case GET_USER:
      newState.user = action.user
      break
    default:
      return state    
  }
  return newState
}

export default reducer
