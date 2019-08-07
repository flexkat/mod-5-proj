import React from 'react'
import SearchBar from '../components/SearchBar';

class Setup extends React.Component {
  render() {
    return (
      <div>Setup page
        <SearchBar searchTerm={this.props.searchTerm} handleChange={this.props.handleChange}/>
        <ul>
          {
            this.props.medicines.map(med => <li>{med.name}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default Setup