import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
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
    newDrug: {
      id: '',
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

  addNewMedToUserMed = (e, history) => {
    e.preventDefault();
    const drugName = this.state.medicines.find(med => med.url === this.state.newDrug.id)
    this.setState({
      usersMedicines: [
        ...this.state.usersMedicines,
        {...this.state.newDrug, name: drugName.name}
      ],
      newDrug: {
        id: '',
        dose: '',
        morning: false,
        evening: false
      }
    }, () => setTimeout(()=> this.redirectToHome(history), 500))
  }

  updateUserMed = (e, history) => {
    e.preventDefault();
    const updatedUserMeds = this.state.usersMedicines.map(med => {
      if(med.id !== this.state.newDrug.id) return med
      return this.state.newDrug
    })
    this.setState({
      usersMedicines: updatedUserMeds
    }, () => setTimeout(()=> this.redirectToHome(history), 500))
  }

  setDrugToDisplay = (drug, history) => {
    this.setState({
      newDrug: { 
        id: drug.id,
        name: drug.name,
        dose: drug.dose,
        morning: drug.morning,
        evening: drug.evening
      }
    }, () => setTimeout(()=> this.redirectToMedicineDetails(history), 500))
  }

  deleteMed = (history) => {
    const remainingUserMeds = this.state.usersMedicines.filter(med => med.id !== this.state.newDrug.id)
    this.setState({
      usersMedicines: remainingUserMeds,
      newDrug: {
        id: '',
        dose: '',
        morning: false,
        evening: false
      }
    }, () => setTimeout(()=> this.redirectToHome(history), 500))
  }

  redirectToHome = (history) => {
    console.log("changing page....")
    console.log(history)
    history.push(`/`)
  }

  redirectToMedicineDetails = (history) => {
    history.push('/medicine-details')
  }


  render() {
    // const medicines = this.searchForMedicine();
    return (
      <Router> 
        <div className="App">
          <Navbar />
          Pill Pal
          <Route path="/" exact render={(props) => <Home {...props} medicines= {this.state.usersMedicines} setDrugToDisplay={this.setDrugToDisplay}/>} />
          <Route path="/medicine-details" render={(props) => <MedicineDetails {...props} medicine = {this.state.newDrug} handleChange={this.editNewMedForUser} handleSubmit={this.updateUserMed} deleteMed={this.deleteMed}/>} />
          <Route path="/setup" render={(props) => <Setup {...props} newDrug={this.state.newDrug} medicines={this.state.medicines} handleChange={this.editNewMedForUser} handleSubmit={this.addNewMedToUserMed}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
