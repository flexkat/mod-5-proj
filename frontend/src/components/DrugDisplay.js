import React from 'react'

class DrugDisplay extends React.Component {
  render() {
    return(
      <div>
        <h2>{this.props.medicine.name}</h2>

      </div>
    )
  }
}

export default DrugDisplay