import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import API from './adapters/API'
import './App.css';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import MedicineDetails from './containers/MedicineDetails'
import Setup from './containers/Setup'
import { getDrugId } from './utils/medicines';

class App extends React.Component {

  state = {
    user: {
      name: 'Jane'
    },
    medicines: [],
    usersMedicines: [],
    userMedicineDetails: null,
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
      usersMedicines: API.usersMedicines,
      userMedicineDetails: API.userMedicineDetails
    })
  }

  editNewMedForUser = (key, value) => {
    this.setState({
      newDrug: {
        ...this.state.newDrug,
        [key]: value
      }
    })
  }

  resetNewDrugState = () => {
    this.setState({
      newDrug: {
        url: '',
        dose: '',
        morning: false,
        evening: false
      }
    })
  }


  // needs persistence
  addNewMedToUserMed = (e, history) => {
    e.preventDefault();
    const drugName = this.state.medicines.find(med => med.url === this.state.newDrug.url)
    const drugId = getDrugId(this.state.newDrug)
    const drugExists = this.state.usersMedicines.find(med => med.id === drugId)
    if (drugExists) {
      console.log(`${drugId} exists`)
      return
    }
    
    return this.setState({
      usersMedicines: [
        ...this.state.usersMedicines,
        {...this.state.newDrug, name: drugName.name, id: drugId}
      ]
    }, () => {
      this.resetNewDrugState();
      setTimeout(()=> this.redirectToHome(history), 500)
    })
  }

  // needs persistence
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
 
  // needs persistence
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

  setDrugToDisplay = (drug, history) => {
    this.setState({
      newDrug: { 
        id: drug.id,
        name: drug.name,
        dose: drug.dose,
        morning: drug.morning,
        evening: drug.evening
      }
    }, () => this.redirectToMedicineDetails(history))
  }

  redirectToHome = (history) => {
    history.push(`/`)
  }

  redirectToMedicineDetails = (history) => {
    history.push('/medicine-details')
  }


  setMedicineTaken = (taken, medicine) => {
    const updatedUserMedicines = this.state.usersMedicines.map(med => {
      if(med.id !== medicine.id) return med;

      return {
        ...med,
        history: {
          ...med.history,
          [new Date().toUTCString()]: taken
        }
      }
    })

    this.setState({
      usersMedicines: updatedUserMedicines
    })
  }
  

  render() {
    // const medicines = this.searchForMedicine();
    return (
      <Router> 
        <div className="App">
          <Navbar />
          Pill Pal
          <Route path="/" exact render={(props) => 
            <Home 
              {...props} 
              medicines= {this.state.usersMedicines} 
              setDrugToDisplay={this.setDrugToDisplay} 
              user={this.state.user}
              setMedicineTaken={this.setMedicineTaken}
            />} 
          />
          <Route path="/medicine-details" render={(props) => <MedicineDetails 
            {...props} 
            medicine = {this.state.newDrug} 
            medicineDetails={this.state.userMedicineDetails} 
            handleChange={this.editNewMedForUser} 
            handleSubmit={this.updateUserMed} 
            deleteMed={this.deleteMed}/>} 
          />
          <Route path="/setup" render={(props) => <Setup {...props} resetNewDrugState={this.resetNewDrugState} newDrug={this.state.newDrug} medicines={this.state.medicines} handleChange={this.editNewMedForUser} handleSubmit={this.addNewMedToUserMed}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
