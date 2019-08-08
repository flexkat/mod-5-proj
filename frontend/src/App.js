import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import API from './adapters/API'
import './App.css';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import MedicineDetails from './containers/MedicineDetails'
import Setup from './containers/Setup'

class App extends React.Component {

  state = {
    medicines: [],
    usersMedicines: [],
    searchTerm: "",
    newDrug: {
      name: '',
      dose: '',
      morning: false,
      evening: false

    }
  }

  componentDidMount() {
    this.setState({
      medicines: API.medicines,
      usersMedicines: API.usersMedicines
    })
  }

  setSearchTerm = (value) => {
    this.setState({
      searchTerm: value
    })
  }

  searchForMedicine = () => {
    if(this.state.searchTerm === "") return []
    const searchTermToLower = this.state.searchTerm.toLowerCase();
    return this.state.medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTermToLower))
  }

  editNewMedForUser = (key, value) => {
    this.setState({
      newDrug: {
        ...this.state.newDrug,
        [key]: value
      }
    })
  }

  addNewMedToUserMed = (e) => {
    e.preventDefault();
    this.setState({
      usersMedicines: [
        ...this.state.usersMedicines,
        this.state.newDrug
      ],
      newDrug: {
        name: '',
        dose: '',
        morning: false,
        evening: false
      }
    })
  }


  render() {
    // const medicines = this.searchForMedicine();
    return (
      <Router> 
        <div className="App">
          <Navbar />
          Pill Pal
          <Route path="/" exact render={() => <Home medicines= {this.state.usersMedicines} />} />
          <Route path="/medicine-details" component={MedicineDetails} />
          <Route path="/setup" render={() => <Setup newDrug={this.state.newDrug} medicines={this.state.medicines} handleChange={this.editNewMedForUser} morning={this.state.newDrug.morning} evening={this.state.newDrug.evening} handleSubmit={this.addNewMedToUserMed}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
