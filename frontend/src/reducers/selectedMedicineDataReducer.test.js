import selectedMedicineDataReducer from './selectedMedicineDataReducer'

describe('selected medicine data reducer', () => {
  it('should return initial state if no action type defined', () => {
    const result = selectedMedicineDataReducer()
    expect(result).toEqual({ medicineData: null })
  })
  it('should return an array of objects containing the selected medicines data when the action type is FETCH_MEDICINE_DATA', () => {
    const result = selectedMedicineDataReducer({test: "state"}, {type:'FETCH_MEDICINE_DATA', payload: [{med: "1", SE: "lots"}, {med: "2", SE: "not many"}]})
    expect(result).toEqual({test: "state", medicineData: [{med: "1", SE: "lots"}, {med: "2", SE: "not many"}]})
  })
})