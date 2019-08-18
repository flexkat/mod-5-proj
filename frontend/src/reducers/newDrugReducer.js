const initialState = {id: "", dose: "", morning: false, evening: false}
export default(state = initialState, action={}) => {
  switch(action.type) {
    case "SAVE_DETAILS": 
      return {
        ...state,

        [action.payload.key]: action.payload.value
      }
    case "RESET_NEW_DRUG_DETAILS":
      return initialState
    case "SET_SELECTED_DRUG":
      return {
        ...action.payload
      }
    default:
      return state
  }
}