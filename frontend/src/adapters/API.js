import { getDrugId } from '../utils/medicines';

import Page1Meds from '../data/medicines1.json'
import amlodipine from '../data/medicines-Amlodipine.json'


const medicines = Page1Meds.significantLink.map(link => link)

const userMeds = Page1Meds.significantLink.filter(link => {
  return (link.name === 'Amlodipine' || link.name === 'Bumetanide')
})

const usersMedicines = userMeds.map(med => {return {
  id: getDrugId({ url: med.url, dose: 20, morning: true, evening: false }),
  name: med.name,
  dose: 20,
  morning: true,
  evening: false,
  url: med.url
}})

const userMedicineDetails = amlodipine;

export default {
  medicines,
  usersMedicines,
  userMedicineDetails
}

