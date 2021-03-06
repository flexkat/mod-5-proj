import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import API from './adapters/API'
import './App.css';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import MedicineDetails from './containers/MedicineDetails'
import Setup from './containers/Setup'
import StatisticsContainer from './containers/StatisticsContainer'
import Contact from './containers/Contact'
import { getDrugId, getDate } from './utils/medicines';
import { connect } from 'react-redux';
import { saveFetchedMedicines } from './actions/medicinesActions';
import { saveUserMedicines } from './actions/userMedicinesAction';
import { saveNewDrugDetails, resetNewDrug, setSelectedDrug } from './actions/newDrugAction'
import ScrollToTop from './utils/ScrollToTop';

class App extends React.Component {

  state = {
    user: { name: 'Jane', id: 1 },
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

  addNewMedToUserMed = (e, history) => {
    e.preventDefault();
    const drugName = this.props.medicines.find(med => med.url === this.props.newDrug.url)
    const drugId = getDrugId(this.props.newDrug)
    const drugExists = this.props.usersMedicines.find(med => med.id === drugId)
    if (drugExists) {
      console.log(`${drugId} exists`)
      return
    }
    API.postNewMedicine({...this.props.newDrug, name: drugName.name, composite_id: drugId, user_id: 1})
    .then(() => this.resetStateAndRedirect(history))
  }

  resetStateAndRedirect = (history) => {
    this.getUserMedicines()
    .then(() => {
      this.props.resetNewDrug();
      setTimeout(()=> history.push(`/`), 500)
    })
  }

  updateUserMed = (e, history) => {
    e.preventDefault();
    API.patchNewMedicine(this.props.newDrug)
    .then(() => this.resetStateAndRedirect(history))
  }
 
  deleteMed = (history) => {
    API.deleteUserMedicine(this.props.newDrug)
    .then(() => this.resetStateAndRedirect(history))
  }

  setDrugToDisplay = (drug, history) => {
    this.props.setSelectedDrug(drug)
    history.push('/medicine-details')
  }

  resetDay = () => {
    const updatedUserMedicines = this.props.usersMedicines.map(med => {
      let drugHistory = med.history;
      for(const date in drugHistory) {
        if(date === getDate()) {
          for(const time in drugHistory[date].clicked) {
            drugHistory[date].clicked[time] = false 
            drugHistory[date].status[time] = null 
          }
        }
      } 
      const updatedMed = {
        ...med,
        history: drugHistory
      }

      API.patchNewMedicine(updatedMed)
      .then(this.getUserMedicines)
    })
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
            <Navbar resetNewDrugState={this.props.resetNewDrug}/>
            <Route path="/" exact render={(props) => 
              <Home 
                {...props} 
                medicines={this.props.usersMedicines} 
                setDrugToDisplay={this.setDrugToDisplay} 
                user={this.state.user}
                setMedicineTaken={this.setMedicineTaken}
                resetDay={this.resetDay}
              />} 
            />
            <Route path="/medicine-details" render={(props) => <MedicineDetails 
              {...props} 
              medicine = {this.props.newDrug} 
              handleChange={this.props.saveNewDrugDetails} 
              handleSubmit={this.updateUserMed} 
              deleteMed={this.deleteMed}/>} 
            />
            <Route path="/setup" render={(props) => <Setup 
              {...props} 
              resetNewDrugState={this.props.resetNewDrug} 
              newDrug={this.props.newDrug} 
              medicines={this.props.medicines} 
              handleChange={this.props.saveNewDrugDetails} 
              handleSubmit={this.addNewMedToUserMed}/>} 
            />
            <Route path="/statistics" render={(props) => <StatisticsContainer
              {...props} 
              medicines={this.props.usersMedicines}/>}
            />
            <Route path="/contact" render={(props) => <Contact
              {...props} 
              medicines={this.props.usersMedicines}
              user={this.state.user}/>}
            />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  medicines: state.medicinesReducer.medicines,
  usersMedicines: state.userMedicinesReducer.usersMedicines,
  newDrug: state.newDrugReducer
 })

 const mapDispatchToProps = dispatch => ({
  saveFetchedMedicines: (medicines) => dispatch(saveFetchedMedicines(medicines)),
  saveUserMedicines: (usersMedicines) => dispatch(saveUserMedicines(usersMedicines)),
  saveNewDrugDetails: (key, value) => dispatch(saveNewDrugDetails(key, value)),
  resetNewDrug: () => dispatch(resetNewDrug()),
  setSelectedDrug: (drug) => dispatch(setSelectedDrug(drug))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
