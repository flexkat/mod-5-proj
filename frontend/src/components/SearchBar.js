import React from 'react'

class SearchBar extends React.Component {
  
  render() {
    const handleChange = this.props.handleChange

    return(
      <input placeholder="Search for a medicine" value={this.props.searchTerm} onChange={e=>handleChange(e.target.value)}></input>
    )
  }
}

export default SearchBar;