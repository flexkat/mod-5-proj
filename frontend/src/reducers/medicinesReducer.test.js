import medicinesReducer from './medicinesReducer'

describe("medicines reducer", () => {
  it('should return initial state when there is no action type', () => {
    const result = medicinesReducer("test value")
    expect(result).toEqual("test value")
  })
  it('should return an array of medicine objects when the action type is FETCH_MEDICINES', () => {
    const result = medicinesReducer({test: "state"}, {type: 'FETCH_MEDICINES', payload: [{id: "1"}, {id: "2"}]})
    expect(result).toEqual({ test: "state", medicines: [ { id: '1' }, { id: '2' } ] })
  })
})