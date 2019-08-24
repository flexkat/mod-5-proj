import React from 'react'
import axios from 'axios'
import { Container, Header, Form, TextArea, Button, Dropdown, Checkbox, Message } from 'semantic-ui-react';

class Contact extends React.Component {

  state = {
    selectAll: false,
    submitted: false,
    medsForRefill: [],
    message: ''
  }

  handleSelectAllState = () => {
    this.setState({
      selectAll: !this.state.selectAll
    }, this.selectAllMeds)
  }

  selectAllMeds = () => {
    if(this.state.selectAll) {
      console.log("setting all meds")
      this.setState({
        medsForRefill: this.props.medicines.map(med=> med.id)
      })
    } else {
      this.setState({
        medsForRefill: []
      })
    }
  }

  handleChange = (value, target, $selected) => {
    console.log(target.value)
    const data = target.value
    let key;
    if (target.placeholder === "Select medications for refill") {
      this.setState({
        medsForRefill: [...data]
      })
    } else if (target.placeholder === "My message") {
      this.setState({
        message: data
      })
    }
    
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    const fullMedsForRefill = this.state.medsForRefill.map(id => {return this.props.medicines.find(med => med.id === id)})

    const fullMedName = fullMedsForRefill.map(med => `${med.name} - ${med.dose}mg`)
   
    axios.post('http://localhost:3002/contact', {
      user: this.props.user.name,
      message: this.state.message,
      medsForRefill: fullMedName
    })
    this.setState({
      submitted: true,
      medsForRefill: [],
      message: "",
      selectAll: false
    })
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
            <label>To: doctor@flatiron-drs.com</label>
          </Form.Field>
          <Form.Field>
            <label>Medications for refill</label>
            <Dropdown
              placeholder="Select medications for refill"
              fluid
              multiple
              search
              selection
              value={this.state.medsForRefill}
              options={medOptions}
              onChange={this.handleChange}
            />
            <Checkbox label="Add all my medications" checked={this.state.selectAll} className="toggle add-all" onClick={this.handleSelectAllState}/> 
           </Form.Field>
           <Form.Field>  
            <Form.Field control={TextArea} label="My message" placeholder="My message" value={this.state.message} onChange={this.handleChange}/>
          </Form.Field>
          <Message success header='Form Completed' content="Your refill request has been sent" />
          <Button value="submit">Request Refill</Button>
        </Form>
      </Container>
    )
  }
}

export default Contact
