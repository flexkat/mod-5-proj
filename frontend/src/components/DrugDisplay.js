import React from 'react'

class DrugDisplay extends React.Component {
  render() {
    return(
      <div onClick={() => this.props.handleClick(this.props.medicine, this.props.history)}>
        <h2>{this.props.medicine.name}</h2>
      </div>
    )
  }
}

export default DrugDisplay