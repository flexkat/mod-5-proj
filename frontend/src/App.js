import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import API from './adapters/API'
import './App.css';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import MedicineDetails from './containers/MedicineDetails'
import Setup from './containers/Setup'
import Dashboard from './containers/Dashboard'
import { getDrugId, getDate } from './utils/medicines';
import ScrollToTop from './utils/ScrollToTop';

class App extends React.Component {

  state = {
    user: {
      name: 'Jane',
      id: 1
    },
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
    this.getUserMedicines()
    API.getMedicines().then(medicines => 
      this.setState({
        medicines: medicines
      })
    )
  }

  getUserMedicines = () => {
    return API.getUserMedicines()
    .then(usersMedicines => 
      this.setState({
        usersMedicines: usersMedicines.sort((a, b) => a.id - b.id),
      })
    )
     
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

  addNewMedToUserMed = (history) => {
    const drugName = this.state.medicines.find(med => med.url === this.state.newDrug.url)
    const drugId = getDrugId(this.state.newDrug)
    API.postNewMedicine({...this.state.newDrug, name: drugName.name, composite_id: drugId, user_id: 1})
    .then(() => this.resetStateAndRedirect(history))
  }

  resetStateAndRedirect = (history) => {
    this.getUserMedicines()
    .then(() => {
      this.resetNewDrugState();
      setTimeout(()=> this.redirectToHome(history), 500)
    })
  }

  updateUserMed = (history) => {
    const drugId = getDrugId(this.state.newDrug)
    API.patchNewMedicine({ ...this.state.newDrug, composite_id: drugId})
    .then(() => this.resetStateAndRedirect(history))
  }
 
  deleteMed = (history) => {
    API.deleteUserMedicine(this.state.newDrug)
    .then(() => this.resetStateAndRedirect(history))
  }

  setDrugToDisplay = (drug, history) => {
    this.setState({
      newDrug: { 
        ...drug
      }
    }, () => this.redirectToMedicineDetails(history))
  }

  redirectToHome = (history) => {
    history.push(`/`)
  }

  redirectToMedicineDetails = (history) => {
    history.push('/medicine-details')
  }

  

  setMedicineTaken = (taken, medicine, time) => {
    const editingUserMedicine = this.state.usersMedicines.find(med => med.id === medicine.id)
    if (!editingUserMedicine) return

    const currentDrugHistory = editingUserMedicine.history[getDate()] || {} 
    const updatedUserMedicine = {
      ...editingUserMedicine,
      history: {
        ...editingUserMedicine.history,
        [getDate()]: {
          status: {
            ...currentDrugHistory.status,
            [time]: taken
          },
          clicked: {
            ...currentDrugHistory.clicked,
            [time]: true
          }
        }
      }
    }
    API.patchNewMedicine(updatedUserMedicine)
    .then(this.getUserMedicines)
      
  }
  

  render() {
    return (
      <Router> 
        <ScrollToTop>
          <div className="App">
            <Navbar />
            <Route path="/" exact render={(props) => <Home 
              {...props} 
              medicines={this.state.usersMedicines} 
              setDrugToDisplay={this.setDrugToDisplay} 
              user={this.state.user}
              setMedicineTaken={this.setMedicineTaken}
            />} 
            />
            <Route path="/medicine-details" render={(props) => <MedicineDetails 
              {...props} 
              medicine = {this.state.newDrug} 
              usersMedicines={this.state.usersMedicines}
              handleChange={this.editNewMedForUser} 
              handleSubmit={this.updateUserMed} 
              deleteMed={this.deleteMed}/>} 
            />
            <Route path="/setup" render={(props) => <Setup 
              {...props} 
              resetNewDrugState={this.resetNewDrugState} 
              newDrug={this.state.newDrug} 
              medicines={this.state.medicines} 
              usersMedicines={this.state.usersMedicines}
              handleChange={this.editNewMedForUser} 
              handleSubmit={this.addNewMedToUserMed}/>} 
            />
            <Route path="/dashboard" render={(props) => <Dashboard 
              {...props} 
              medicines={this.state.usersMedicines}/>} 
            />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
