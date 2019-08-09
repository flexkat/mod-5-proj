import React from 'react'
import SearchBar from '../components/SearchBar';
// import { Dropdown } from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

class Setup extends React.Component {
  render() {
    const {morning, evening} = this.props.newDrug
    return (
      <div>
        <h3>Setup page</h3>
        <Form onSubmit={(e) => this.props.handleSubmit(e, this.props.history)}>
          <select onChange={(e) => this.props.handleChange("id", e.target.value)} value={this.props.newDrug.id}>
            <option value="">Select a medicine</option>
            {
              this.props.medicines.map(med => <option value={med.url}>{med.name}</option>)
            }
          </select>
          <br/>
          <select onChange={(e) => this.props.handleChange("dose", e.target.value)} value={this.props.newDrug.dose}>
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
          <Button type="submit">Add new medicine</Button>
        </Form>
      </div>
    )
  }
}

export default Setup