import React from 'react'
import DrugDisplay from '../components/DrugDisplay'

class DrugHomeContainer extends React.Component {
  render(){
    return(
      <div>
        My medicines
        {
          this.props.medicines.map(medicine => <DrugDisplay medicine={medicine}/>)
        }
        
      </div>
    )
  }
}

export default DrugHomeContainer;