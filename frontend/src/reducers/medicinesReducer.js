const initialState = {medicines: []}
export default (state = initialState, action={}) => {
  switch (action.type) {
   case 'FETCH_MEDICINES':
    return {
      ...state,
      medicines: action.payload
    }
   default:
    return state
  }
 }