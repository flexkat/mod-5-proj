import Page1Meds from '../data/medicines1.json'
import amlodipine from '../data/medicines-Amlodipine.json'
const USER_MEDICINES_URL = "https://hidden-ravine-73146.herokuapp.com/user_medicines"

const getUserMedicines = () => {
  return fetch(USER_MEDICINES_URL)
  .then(res=>res.json())
}

const fetchNHS = (url) => {
  return fetch(url)
  .then(res => res.json())
}

const getMedicines = () => {
  // return fetchNHS("https://api.nhs.uk/medicines?page=2")
  // .then(data => data.significantLink)
  return Promise.resolve(Page1Meds.significantLink)
}

const getMedicineDetails = (url) => {
  // return fetchNHS(url) 
  return Promise.resolve(amlodipine)
}

const postNewMedicine = (userMedicine) => {
  return fetch(USER_MEDICINES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userMedicine)
  })
  .then(res => res.json())
}

const deleteUserMedicine = (userMedicine) => {
  return fetch(`${USER_MEDICINES_URL}/${userMedicine.id}`, {
    method: "DELETE"
  })
}

const patchNewMedicine = (userMedicine) => {
  return fetch(`${USER_MEDICINES_URL}/${userMedicine.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userMedicine)
  })
  .then(res => res.json())
}

export default {
  fetchNHS,
  getUserMedicines,
  getMedicines,
  getMedicineDetails,
  postNewMedicine,
  deleteUserMedicine,
  patchNewMedicine
}

