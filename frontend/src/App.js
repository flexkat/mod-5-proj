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
    medicines: [
      {
        id: 1,
        name: "paracetamol",
        user_id: 1
      },
      {
        id: 2,
        name: "omeprazole",
      }
    ],
    searchTerm: ""
  }

  componentDidMount() {
    this.setState({
      medicines: API.medicines
    })
  }

  userMedicines = () => {
    return this.state.medicines.filter(medicine => medicine.user_id === 1)
  }
  setSearchTerm = (value) => {
    this.setState({
      searchTerm: value
    })
  }

  searchForMedicine = () => {
    if(this.state.searchTerm === "") return []
    return this.state.medicines.filter(medicine => medicine.name.includes(this.state.searchTerm))
  }


  render() {
    const medicines = this.searchForMedicine();
    const userMeds = this.userMedicines();
    return (
      <Router> 
        <div className="App">
          <Navbar />
          Pill Pal
          <Route path="/" exact render={() => <Home medicines= {userMeds} />} />
          <Route path="/medicine-details" component={MedicineDetails} />
          <Route path="/setup" render={() => <Setup searchTerm={this.state.searchTerm} medicines={medicines} handleChange={this.setSearchTerm}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
