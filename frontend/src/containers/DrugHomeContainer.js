import React from 'react'
import DrugDisplay from '../components/DrugDisplay'
import { Grid, Header, Container, Divider } from 'semantic-ui-react';

class DrugHomeContainer extends React.Component {
  render(){
    return(
      <Container>
        <Header as="h3">My medicines</Header>

        <Grid>
        {
          this.props.medicines.map(medicine => (
          medicine.morning ? <DrugDisplay setMedicineTaken={this.props.setMedicineTaken} key={`${medicine.id}-AM`} {...this.props} time="AM" medicine={medicine} handleClick={this.props.handleClick}/> : null))
        }
        <Divider/>
        {
          this.props.medicines.map(medicine => (
          medicine.evening ? <DrugDisplay setMedicineTaken={this.props.setMedicineTaken} key={`${medicine.id}-PM`} {...this.props} time="PM" medicine={medicine} handleClick={this.props.handleClick}/> : null))
        }
        </Grid>
      </Container>
    )
  }
}

export default DrugHomeContainer;