import React from 'react'
import { Icon, Segment, Button, Grid } from 'semantic-ui-react'
import { getDate } from '../utils/medicines';


class DrugDisplay extends React.Component {

  state = {
    currentDate: getDate()
  }

  render() {
    const {handleClick, setMedicineTaken, medicine, time }  = this.props;
    const {name, dose, history} = medicine;
    const todaysHistory = history && history[this.state.currentDate]
    const doseClicked = todaysHistory && todaysHistory.clicked[time]
    const doseTaken = doseClicked && todaysHistory.status[time]
    const compliance = todaysHistory && todaysHistory.status[time]
    

    return(
      <Grid.Row columns="equal">
        <Grid.Column className="vertical-align">{time === "AM" ? "☀️" : "🌒"}</Grid.Column>
        <Grid.Column width={8}>
          <Segment
            onClick={() => handleClick(medicine, this.props.history)}
            style={{cursor: 'pointer'}}
            className={doseClicked ? "secondary" : "raised"}
            textAlign='left'
          >
            <Icon name='pills'/>
            {name} - {dose}mg
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Button.Group className="desktop">
            <Button 
              disabled={doseClicked} 
              onClick={(e) => setMedicineTaken(false, medicine, time)} 
              className={!compliance ? "compliance missed" : "compliance"} 
              value="missed"
            >
              {doseTaken ? "" : "Missed"}
            </Button>
            <Button 
              disabled={doseClicked} 
              positive 
              onClick={(e) => setMedicineTaken(true, medicine, time)} 
              className={compliance ? "compliance taken" : "compliance"} 
              value="taken"
            >
              {(doseClicked && doseTaken) || (!doseClicked) ? "Taken" : ""}
            </Button>
            </Button.Group>
            <Button.Group className="mobile">
            <Button 
              disabled={doseClicked} 
              onClick={(e) => setMedicineTaken(false, medicine, time)} 
              className={!compliance ? "compliance missed" : "compliance"} 
              value="missed"
            >
              {doseTaken ? "" : "X"}
            </Button>
            <Button 
              disabled={doseClicked} 
              positive 
              onClick={(e) => setMedicineTaken(true, medicine, time)} 
              className={compliance ? "compliance taken" : "compliance"} 
              value="taken"
            >
              {(doseClicked && doseTaken) || (!doseClicked) ? "✓" : ""}
            </Button>
          </Button.Group>
        </Grid.Column >
      </Grid.Row>
    )
  }
}

export default DrugDisplay