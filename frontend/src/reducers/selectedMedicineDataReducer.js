const initialState = {medicineData: null}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_MEDICINE_DATA':
      return {
        ...state, 
        medicineData: action.payload
      }
    default:
      return state
  }
}