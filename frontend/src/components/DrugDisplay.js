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
    

    return(
      <Grid columns="equal">
        <Grid.Column >{time}</Grid.Column>
        <Grid.Column width={7}>
          <Segment 
            onClick={() => handleClick(medicine, this.props.history)}
            style={{cursor: 'pointer'}}
          >
            <Icon name='pills'/>
            {name} - {dose}mg
          </Segment>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button.Group >
            <Button disabled={doseClicked} onClick={(e) => setMedicineTaken(false, medicine, time)} className={todaysHistory && todaysHistory.status[time] === false ? "compliance missed" : "compliance"} value="missed">{doseTaken ? "" : "Missed"}</Button>
            <Button disabled={doseClicked} positive onClick={(e) => setMedicineTaken(true, medicine, time)} className={todaysHistory && todaysHistory.status[time] === true ? "compliance taken" : "compliance"} value="taken">{(doseClicked && doseTaken) || (!doseClicked) ? "Taken" : ""}</Button>
          </Button.Group>
        </Grid.Column >
        <Grid.Column></Grid.Column>
      </Grid>
    )
  }
}

export default DrugDisplay