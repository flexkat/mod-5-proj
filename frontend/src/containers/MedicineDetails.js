import React from 'react'

class MedicineDetails extends React.Component {
  render() {
    const {morning, evening} = this.props.medicine
    return (
      <div>Medicine Details page
        <form onSubmit={(e) => this.props.handleSubmit(e, this.props.history)}>
          <h3>{this.props.medicine.name}</h3>
          <br/>
          <select onChange={(e) => this.props.handleChange("dose", e.target.value)} value={this.props.medicine.dose}>
            <option value="">Select a dose</option>
            <option value="10">10mg</option>
            <option value="20">20mg</option>
            <option value="30">30mg</option>
            <option value="40">40mg</option>
          </select>
          <p>Select when you take the medicine:</p>  
          <div>
            <input type="checkbox" id="morning" name="morning" checked={morning} onChange={(e) => this.props.handleChange("morning", !morning)}/>
            <label for="morning">Morning</label>
          </div>
          <div>
            <input type="checkbox" id="evening" name="evening" checked={evening} onChange={(e) => this.props.handleChange("evening", !evening)}/>
            <label for="evening">Evening</label>
          </div>
          <br/>
          <input type="submit" value='Update medicine'/>
          <button value="Delete" onClick={() => this.props.deleteMed(this.props.history)}>Delete Medicine</button>
        </form>
      </div>
    )
  }
}

export default MedicineDetails