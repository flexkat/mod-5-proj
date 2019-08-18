import newDrugReducer from './newDrugReducer'

describe ("new drug reducer", () => {
  it('should return default state when no action type is given', () => {
    const result = newDrugReducer("test value")
    expect(result).toEqual("test value")
  })
  it('should return default state when action type is RESET_NEW_DRUG_DETAILS', () => {
    const result = newDrugReducer({}, {type: "RESET_NEW_DRUG_DETAILS"})
    expect(result).toEqual({ id: '', dose: '', morning: false, evening: false })
  })
  it('should return the drug passed in when the action type is SET_SELECTED_DRUG', () => {
    const result = newDrugReducer({}, {type: "SET_SELECTED_DRUG", payload: {id: "1", dose: "20"}})
    expect(result).toEqual({id: '1', dose: '20' })
  })
  it('should return the new key and value in state when the action type is SAVE_DETAILS', () => {
    const result = newDrugReducer({id: "1"}, {type: 'SAVE_DETAILS', payload: {key: "newKey", value: "newValue"}})
    expect(result).toEqual({ id: '1', newKey: 'newValue' })
  })
})
