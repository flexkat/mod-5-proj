import userMedicinesReducer from './userMedicinesReducer'

describe("user-medicines reducer", () => {
  it('should return initial state when there is no action type', () => {
    const result = userMedicinesReducer()
    expect(result).toEqual({usersMedicines: []})
  })
  it('should return an array of medicine objects when the action type is FETCH_USER_MEDICINES', () => {
    const result = userMedicinesReducer({test: "state"}, {type: 'FETCH_USER_MEDICINES', payload: [{id: "1"}, {id: "2"}]})
    expect(result).toEqual({ test: "state", usersMedicines: [ { id: '1' }, { id: '2' } ] })
  })
})