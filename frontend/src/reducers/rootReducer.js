import { combineReducers } from 'redux';
import medicinesReducer from './medicinesReducer';
import selectedMedicineDataReducer from './selectedMedicineDataReducer';

export default combineReducers({
  medicinesReducer,
  selectedMedicineDataReducer
});