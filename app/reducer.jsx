
const GET_USER = 'GET_USER'
export const getUser = user => ({
  type: GET_USER,
  user
})

export const fetchUser = user =>
  dispatch => dispatch(getUser(user))

const reducer = (state={}, action) => {
  let newState = Object.assign({}, state)

  switch(action.type) {
    case GET_USER:
      console.log('GET USER CALLED!')
      newState.user = action.user
      break
    default:
      return state    
  }
  return newState
}

export default reducer
