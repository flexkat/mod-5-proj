import React from 'react'
import { Container, Header, Form, TextArea, Button, Dropdown, Checkbox, Message } from 'semantic-ui-react';

class Contact extends React.Component {

  state = {
    selectAll: false,
    submitted: false,
    medsForRefill: []
  }

  handleSelectAllState = () => {
    this.setState({
      selectAll: !this.state.selectAll
    }, () => this.selectAllMeds)
  }

  selectAllMeds = () => {
    
  }

  handleChange = (value, target, $selected) => {
    console.log(target.value)
    
    this.setState({
      medsForRefill: [...target.value]
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      submitted: true
    })
    console.log('=======================');
    console.log('this.state.medsForRefill', this.state.medsForRefill);
    console.log('=======================');
  }


  render() {
    const medOptions= this.props.medicines.map(med => {
      return {
      key: med.id,
      text: med.name,
      value: med.id
      }
    })
    
    return(
      <Container>
        <Header as="h2">Contact your Doctor</Header>
        <Form className={this.state.submitted ? "success" : null} onSubmit={this.handleSubmit} >
          <Form.Field>
            <label>To</label>
            <input placeholder="Your Doctors Email" />
          </Form.Field>
          <Form.Field>
            <label>Medications for refill</label>
            <Dropdown
              placeholder="Select medications for refill"
              fluid
              multiple
              search
              selection
              options={medOptions}
              onChange={this.handleChange}
            />
            <Checkbox label="Add all my medications" className="toggle add-all" onChange={this.handleSelectAllState}/> 
           </Form.Field>
           <Form.Field>  
            <Form.Field control={TextArea} label="Your message"/>
          </Form.Field>
          <Message success header='Form Completed' content="Your refill request has been sent" />
          <Button value="submit">Request Refill</Button>
        </Form>
      </Container>
    )
  }
}

export default Contact
