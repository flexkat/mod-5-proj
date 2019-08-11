import React from 'react'
import { Icon, Segment, Button, Grid } from 'semantic-ui-react'


class DrugDisplay extends React.Component {

  state = {
    clicked: false,
    doseTaken: false,
    currentDate: new Date().toUTCString()
  }

  handleClick = (e) => {
    const now = new Date();
    console.log(now);
    this.setState({
      clicked: true
    })
  }

  render() {
    // const medicineTaken = this.props.medicine.history[this.state.currentDate];
    // console.log(medicineTaken) 
    return(
      <Grid columns="equal">
        <Grid.Column>{this.props.time}</Grid.Column>
        <Grid.Column width={8}>
          <Segment 
            onClick={() => this.props.handleClick(this.props.medicine, this.props.history)}
            style={{cursor: 'pointer'}}
          >
            <Icon name='pills' />{this.props.medicine.name} - {this.props.medicine.dose}mg
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Button.Group>
            <Button disabled={this.state.clicked} onClick={(e) => this.props.setMedicineTaken(false, this.props.medicine)} value="missed">Missed</Button>
            <Button disabled={this.state.clicked} positive onClick={(e) => this.handleClick(e)} value="taken">Taken</Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    )
  }
}

export default DrugDisplay