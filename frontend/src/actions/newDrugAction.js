export const saveNewDrugDetails = (key, value) => dispatch => {
  dispatch({
    type: "SAVE_DETAILS",
    payload: {key, value}
  })
}

export const resetNewDrug = () => dispatch => {
  dispatch({
    type: "RESET_NEW_DRUG_DETAILS",
    payload: null
  })
}

export const setSelectedDrug = (drug) => dispatch => {
  dispatch({
    type: "SET_SELECTED_DRUG",
    payload: drug
  })
}