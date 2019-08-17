const initialState = {usersMedicines: []};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_MEDICINES':
      return {
        ...state,
        usersMedicines: action.payload
      }
    default:
      return state
  }
}