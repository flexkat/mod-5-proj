import React from 'react'
import { Icon, Segment, Radio, Button } from 'semantic-ui-react'


class DrugDisplay extends React.Component {
  render() {
    return(
      <>
      <Segment onClick={() => this.props.handleClick(this.props.medicine, this.props.history)}>
        <Icon name='pills' />{this.props.medicine.name}
      </Segment>
      <Button.Group>
        <Button onClick={console.log}>Missed</Button>
        <Button positive onClick={console.log}>Taken</Button>
      </Button.Group>
      </>
    )
  }
}

export default DrugDisplay