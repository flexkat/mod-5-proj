import React from 'react'
import DrugHomeContainer from './DrugHomeContainer';

class Home extends React.Component {
  render() {
    return (
      <div>Home page
        <DrugHomeContainer medicines={this.props.medicines}/>
      </div>
    )
  }
}

export default Home