import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Checkbox, Grid, Segment, Header, Confirm } from 'semantic-ui-react'
import API from '../adapters/API'
import { connect } from 'react-redux';
import { saveFetchedMedicineData } from '../actions/medicinesActions'
import { createDoseOptions } from '../utils/medicines'

class MedicineDetails extends React.Component {

  state = {
    showEditForm: false,
    medicineData: null,
    open: false
  }

  show = () => this.setState({ open: true })
  handleCancel = () => this.setState({ open: false })

  confirmDelete = (props) => {
    this.setState({
      open: false,
      toDelete: true
    },() => {
      if (!this.state.open && !!this.state.toDelete) {
        props.deleteMed(props.history)
      }  
    })
  }

  componentDidMount() {
    if (this.props.medicine && this.props.medicine.url) {
      const splitUrl = this.props.medicine.url.split("www")
      const joinedApiUrl = splitUrl[0] + "api" + splitUrl[1]
      API.getMedicineDetails(joinedApiUrl)
      .then(medicineData => this.props.saveFetchedMedicineData(medicineData))
    }
  }

  sideEffects = () => {
    if (this.props.medicineData === null) return []
    else {
      const mainEntry = this.props.medicineData.mainEntityOfPage
      console.log(mainEntry)
      const sideEffectsObject = mainEntry.find(obj => obj.text === "Side effects")
      const sideEffects = sideEffectsObject.mainEntityOfPage
      for(const obj in sideEffects) {
        sideEffects[obj].text = sideEffects[obj].text.split('/">').join('/" target="_blank">')
        sideEffects[obj].text = sideEffects[obj].text.split('/conditions/').join("https://www.nhs.uk/conditions/")
      }
      
      return sideEffects;
    }
  }

  indication = () => {
    if (this.props.medicineData === null) return []
    else {
      const mainEntry = this.props.medicineData.mainEntityOfPage
      const indicationObj = mainEntry.find(obj => obj.text.includes("About "))
      const indication = indicationObj.mainEntityOfPage
      for(const obj in indication) {
        indication[obj].text = indication[obj].text.split('/">').join('/" target="_blank">')
        indication[obj].text = indication[obj].text.split('/conditions/').join("https://www.nhs.uk/conditions/")
      }
      return indication
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
    if(!this.props.medicine || !this.props.medicine.id) return <Redirect to="/" />
    
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
              <>
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
                <Button basic color="teal" value='Update medicine' onClick={(e) => this.props.handleSubmit(e, this.props.history)}>Update Medicine</Button>
              
                <Button basic color='red' value="Delete" onClick={this.show}>Delete Medicine</Button>
                <Confirm open={this.state.open} onCancel={this.handleCancel} onConfirm={() => this.confirmDelete(this.props)} content={`Are you sure you want to delete ${this.props.medicine.name}?`}/>
              </>}
             {this.indication().map(obj => <Segment className="side-effects" key={"about"} dangerouslySetInnerHTML={{ __html: obj.text}} />)} 
            {this.sideEffects().map(obj => <Segment className="side-effects" key={obj.position} dangerouslySetInnerHTML={{ __html: obj.text}} />)}
          </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  medicineData: state.selectedMedicineDataReducer.medicineData
 })

 const mapDispatchToProps = dispatch => ({
  saveFetchedMedicineData: (data) => dispatch(saveFetchedMedicineData(data))
 })

export default connect(mapStateToProps, mapDispatchToProps)(MedicineDetails);
