import React from 'react'
import DrugDisplay from '../components/DrugDisplay'

class DrugHomeContainer extends React.Component {
  render(){
    return(
      <div>
        My medicines
        {
          this.props.medicines.map(medicine => (
          medicine.morning ? <DrugDisplay setMedicineTaken={this.props.setMedicineTaken} key={`${medicine.id}-AM`} {...this.props} time="AM" medicine={medicine} handleClick={this.props.handleClick}/> : null))
        }
        {
          this.props.medicines.map(medicine => (
          medicine.evening ? <DrugDisplay setMedicineTaken={this.props.setMedicineTaken} key={`${medicine.id}-PM`} {...this.props} time="PM" medicine={medicine} handleClick={this.props.handleClick}/> : null))
        }
        
      </div>
    )
  }
}

export default DrugHomeContainer;