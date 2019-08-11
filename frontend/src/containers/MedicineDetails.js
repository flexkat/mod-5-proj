import React from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react'
import API from '../adapters/API'

class MedicineDetails extends React.Component {

  state = {
    showEditForm: false,
    medicineData: null
  }

  componentDidMount() {
    if (this.props.medicine && this.props.medicine.url) 
    {
      const splitUrl = this.props.medicine.url.split("www")
      const joinedApiUrl = splitUrl[0] + "api" + splitUrl[1]
      API.getMedicineDetails(joinedApiUrl)
      .then(medicineData => this.setState({ medicineData }))
    }
  }

  sideEffects = () => {
    if (this.state.medicineData === null) return []
    else {
      const mainEntry = this.state.medicineData.mainEntityOfPage
      const sideEffectsObject = mainEntry.find(obj => obj.text === "Side effects")
      const sideEffects = sideEffectsObject.mainEntityOfPage
      return sideEffects
    }
  }

  handleClick = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }
  render() {
    const {morning, evening} = this.props.medicine
    
    return (
      <div>Medicine Details page
        <h3>{this.props.medicine.name}</h3>
        <Button value="edit medicine" onClick={this.handleClick}>Edit this medicine</Button>
        {this.state.showEditForm ? 
          (<form onSubmit={(e) => this.props.handleSubmit(e, this.props.history)}>
            <select onChange={(e) => this.props.handleChange("dose", e.target.value)} value={this.props.medicine.dose}>
              <option value="">Select a dose</option>
              <option value="10">10mg</option>
              <option value="20">20mg</option>
              <option value="30">30mg</option>
              <option value="40">40mg</option>
            </select>
            <p>Select when you take the medicine:</p>  
            <Form.Field>
              <Checkbox type="checkbox" id="morning" name="morning" checked={morning} onChange={(e) => this.props.handleChange("morning", !morning)} label="Morning"/>
            </Form.Field>
            <Form.Field>
              <Checkbox type="checkbox" id="evening" name="evening" checked={evening} onChange={(e) => this.props.handleChange("evening", !evening)} label="Evening"/>
            </Form.Field>
            <Button value='Update medicine'>Update Medicine</Button>
            <Button basic color='red' value="Delete" onClick={() => this.props.deleteMed(this.props.history)}>Delete Medicine</Button>
          </form>) : null }
        {this.sideEffects().map(obj => <div key={obj.position} dangerouslySetInnerHTML={{ __html: obj.text}} />)}
      </div>
    )
  }
}

export default MedicineDetails