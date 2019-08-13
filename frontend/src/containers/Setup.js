import React from 'react'
import { Button, Checkbox, Form, Container, Header, Message } from 'semantic-ui-react'
import { getDrugId, createDoseOptions } from '../utils/medicines'

class Setup extends React.Component {

  state = {
    formError: ""
  }
  
  componentDidMount() {
    this.props.resetNewDrugState();
  }

  createOptionsFromProps = (medicine) => {
    return {
      key: medicine.url,
      value: medicine.url,
      text: medicine.name
    }
  }

  handleChange = (value, target, $selected) => {
    // this.setState({
    //   formError: ''
    // })
    const data = target.value
    let key;
    if (target.placeholder === "Select Medicine") {
      key = "url"
    } else if (target.placeholder === "Dose") {
      key = "dose"
    }
    this.props.handleChange(key, data)
  }

  handleSubmitValidation = (e, history) => {
    e.preventDefault();
    // const drugId = getDrugId(this.props.newDrug)
    // const drugExists = this.props.usersMedicines.find(med => med.composite_id === drugId)
    // if (drugExists) {
    //   this.setState({
    //     formError: "Drug already exists"
    //   })
    //   return;
    // }


    this.props.handleSubmit(history);
  }

  render() {
    const {morning, evening} = this.props.newDrug
    const doseOptions = createDoseOptions();
    return (
      <Container>
        <Header as='h1'>Setup page</Header>
        <Form onSubmit={(e) => this.handleSubmitValidation(e, this.props.history)}>
          <Form.Dropdown
            placeholder='Select Medicine'
            onChange={this.handleChange}
            fluid
            search
            selection
            value={this.props.newDrug.url}
            options={this.props.medicines.map(med => this.createOptionsFromProps(med))}
          />
          <br/>
          <Form.Dropdown 
            placeholder="Dose" 
            selection 
            options={doseOptions}
            value={this.props.newDrug.dose} 
            onChange={this.handleChange} />
          <p>Select when you take the medicine:</p>  
          <Form.Field>
            <Checkbox type="checkbox" id="morning" name="morning" checked={morning} onChange={(e) => this.props.handleChange("morning", !morning)} label="Morning"/>
          </Form.Field>
          <Form.Field>
            <Checkbox type="checkbox" id="evening" name="evening" checked={evening} onChange={(e) => this.props.handleChange("evening", !evening)} label="Evening"/>
          </Form.Field>
          <Button type="submit">Add new medicine</Button>
        </Form>

        { this.state.formError ? <Message negative>{this.state.formError}</Message> : ''}
      </Container>
    )
  }
}

export default Setup