import React from 'react'
import DrugHomeContainer from './DrugHomeContainer';
import { Header } from 'semantic-ui-react';

class Home extends React.Component {
  render() {
    return (
      <div>Home page
        <Header as='h2'>Welcome back {this.props.user.name}</Header>
        <DrugHomeContainer {...this.props} medicines={this.props.medicines} handleClick={this.props.setDrugToDisplay}/>
      </div>
    )
  }
}

export default Home