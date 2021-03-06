import React from 'react'
import DrugHomeContainer from './DrugHomeContainer';
import { Header, Container, Button } from 'semantic-ui-react';

class Home extends React.Component {
  render() {
    return (
      <Container className="home-page">Home page
        <Header as='h2'>Welcome back {this.props.user.name}</Header>
        <DrugHomeContainer 
          {...this.props} 
          medicines={this.props.medicines} 
          handleClick={this.props.setDrugToDisplay}
          setMedicineTaken={this.props.setMedicineTaken}
          />
        <br></br>  
        <Button onClick={this.props.resetDay}>Reset</Button>  
      </Container>
    )
  }
}

export default Home