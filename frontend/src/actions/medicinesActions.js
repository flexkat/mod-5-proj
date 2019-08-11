export const saveFetchedMedicines = (medicines) => dispatch => {
  dispatch({
   type: 'FETCH_MEDICINES',
   payload: medicines
  })
 }
 