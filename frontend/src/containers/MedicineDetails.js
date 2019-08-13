import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Checkbox, Grid, Segment, Header } from 'semantic-ui-react'
import API from '../adapters/API'
import { createDoseOptions } from '../utils/medicines'

class MedicineDetails extends React.Component {

  state = {
    showEditForm: false,
    medicineData: null
  }

  componentDidMount() {
    if (this.props.medicine && this.props.medicine.url) {
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

  showEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }

  handleChange = (value, target, $selected) => {
    const data = target.value
    let key;
    if (target.placeholder === "Dose") {
      key = "dose"
    }
    this.props.handleChange(key, data)
  }

  render() {
    if(!this.props.medicine.id) return <Redirect to="/" />
    
    const {morning, evening, dose} = this.props.medicine
    const doseOptions = createDoseOptions();

    return (
      <Grid columns="equal">
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column>
          <Header as='h1'>Medicine Details page</Header>
            <Header as='h2'>{this.props.medicine.name}</Header>
            <Button value="edit medicine" onClick={this.showEditForm}>Edit how I take this medicine</Button>
            <br/>
            <br/>
            {this.state.showEditForm && 
              <form onSubmit={(e) => this.props.handleSubmit(e, this.props.history)}>
                <Form.Dropdown 
                  placeholder="Dose"
                  defaultValue={parseInt(dose)}
                  selection 
                  options={doseOptions}
                  onChange={this.handleChange} />
                <p>Select when you take the medicine:</p>  
                <Form.Field>
                  <Checkbox type="checkbox" id="morning" name="morning" checked={morning} onChange={(e) => this.props.handleChange("morning", !morning)} label="Morning"/>
                </Form.Field>
                <Form.Field>
                  <Checkbox type="checkbox" id="evening" name="evening" checked={evening} onChange={(e) => this.props.handleChange("evening", !evening)} label="Evening"/>
                </Form.Field>
                <br/>
                <Button basic color="teal" value='Update medicine'>Update Medicine</Button>
                <Button basic color='red' value="Delete" onClick={() => this.props.deleteMed(this.props.history)}>Delete Medicine</Button>
              </form>}
            {this.sideEffects().map(obj => <Segment className="side-effects" key={obj.position} dangerouslySetInnerHTML={{ __html: obj.text}} />)}
          </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid>
    )
  }
}

export default MedicineDetails