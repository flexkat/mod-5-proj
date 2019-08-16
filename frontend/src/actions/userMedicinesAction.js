export const saveUserMedicines = (usersMedicines) => dispatch => {
  dispatch({
   type: 'FETCH_USER_MEDICINES',
   payload: usersMedicines
  })
 }