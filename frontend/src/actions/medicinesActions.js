export const saveFetchedMedicines = (medicines) => dispatch => {
  dispatch({
   type: 'FETCH_MEDICINES',
   payload: medicines
  })
 }
 
 export const saveFetchedMedicineData = (data) => dispatch => {
   dispatch({
     type: "FETCH_MEDICINE_DATA",
     payload: data
   })
 }