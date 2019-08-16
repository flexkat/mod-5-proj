import { combineReducers } from 'redux';
import medicinesReducer from './medicinesReducer';
import selectedMedicineDataReducer from './selectedMedicineDataReducer';
import userMedicinesReducer from './userMedicinesReducer'

export default combineReducers({
  medicinesReducer,
  selectedMedicineDataReducer,
  userMedicinesReducer
});