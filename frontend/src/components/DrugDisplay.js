import React from 'react'
import { Icon, Segment, Radio, Button } from 'semantic-ui-react'


class DrugDisplay extends React.Component {

  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({
      clicked: true  
    })
  }

  render() {
    return(
      <>
      <Segment onClick={() => this.props.handleClick(this.props.medicine, this.props.history)}>
        <Icon name='pills' />{this.props.medicine.name}
      </Segment>
      <Button.Group>
        <Button disabled={this.state.clicked} onClick={this.handleClick}>Missed</Button>
        <Button disabled={this.state.clicked} positive onClick={this.handleClick}>Taken</Button>
      </Button.Group>
      </>
    )
  }
}

export default DrugDisplay