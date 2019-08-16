import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import API from './adapters/API'
import './App.css';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import MedicineDetails from './containers/MedicineDetails'
import Setup from './containers/Setup'
import { getDrugId, getDate } from './utils/medicines';
import { connect } from 'react-redux';
import { saveFetchedMedicines } from './actions/medicinesActions';
import { saveUserMedicines } from './actions/userMedicinesAction'
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
    API.getMedicines().then(medicines => this.props.saveFetchedMedicines(medicines))
  }

  getUserMedicines = () => {
    return API.getUserMedicines()
    .then(usersMedicines => {
      const sortedMeds = usersMedicines.sort((a, b) => a.id - b.id)
      return this.props.saveUserMedicines(sortedMeds)
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

  addNewMedToUserMed = (e, history) => {
    e.preventDefault();
    const drugName = this.props.medicines.find(med => med.url === this.state.newDrug.url)
    const drugId = getDrugId(this.state.newDrug)
    const drugExists = this.props.usersMedicines.find(med => med.id === drugId)
    if (drugExists) {
      console.log(`${drugId} exists`)
      return
    }
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

  updateUserMed = (e, history) => {
    e.preventDefault();
    API.patchNewMedicine(this.state.newDrug)
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
    const editingUserMedicine = this.props.usersMedicines.find(med => med.id === medicine.id)
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
            Pill Pal
            <Route path="/" exact render={(props) => 
              <Home 
                {...props} 
                medicines={this.props.usersMedicines} 
                setDrugToDisplay={this.setDrugToDisplay} 
                user={this.state.user}
                setMedicineTaken={this.setMedicineTaken}
              />} 
            />
            <Route path="/medicine-details" render={(props) => <MedicineDetails 
              {...props} 
              medicine = {this.state.newDrug} 
              handleChange={this.editNewMedForUser} 
              handleSubmit={this.updateUserMed} 
              deleteMed={this.deleteMed}/>} 
            />
            <Route path="/setup" render={(props) => <Setup {...props} resetNewDrugState={this.resetNewDrugState} newDrug={this.state.newDrug} medicines={this.props.medicines} handleChange={this.editNewMedForUser} handleSubmit={this.addNewMedToUserMed}/>} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  medicines: state.medicinesReducer.medicines,
  usersMedicines: state.userMedicinesReducer.usersMedicines
 })

 const mapDispatchToProps = dispatch => ({
  saveFetchedMedicines: (medicines) => dispatch(saveFetchedMedicines(medicines)),
  saveUserMedicines: (usersMedicines) => dispatch(saveUserMedicines(usersMedicines))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
