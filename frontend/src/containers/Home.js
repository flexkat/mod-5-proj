import React from 'react'
import DrugHomeContainer from './DrugHomeContainer';

class Home extends React.Component {
  render() {
    return (
      <div>Home page
        <DrugHomeContainer {...this.props} medicines={this.props.medicines} handleClick={this.props.setDrugToDisplay}/>
      </div>
    )
  }
}

export default Home