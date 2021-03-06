import React from 'react'
import { Button, Checkbox, Form, Container, Header } from 'semantic-ui-react'
import { createDoseOptions } from '../utils/medicines'

class Setup extends React.Component {

  createOptionsFromProps = (medicine) => {
    return {
      key: medicine.url,
      value: medicine.url,
      text: medicine.name
    }
  }

  handleChange = (value, target, $selected) => {
    const data = target.value
    let key;
    if (target.placeholder === "Select Medicine") {
      key = "url"
    } else if (target.placeholder === "Dose") {
      key = "dose"
    }
    this.props.handleChange(key, data)
  }

  render() {
    const {morning, evening} = this.props.newDrug
    const doseOptions = createDoseOptions();
    return (
      <Container>
        <Header as='h1'>Setup page</Header>
        <Form onSubmit={(e) => this.props.handleSubmit(e, this.props.history)}>
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
      </Container>
    )
  }
}

export default Setup