import { combineReducers } from 'redux';
import medicinesReducer from './medicinesReducer';
import selectedMedicineDataReducer from './selectedMedicineDataReducer';
import userMedicinesReducer from './userMedicinesReducer';
import newDrugReducer from './newDrugReducer';

export default combineReducers({
  medicinesReducer,
  selectedMedicineDataReducer,
  userMedicinesReducer,
  newDrugReducer
});