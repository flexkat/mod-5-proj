import Page1Meds from '../data/medicines1.json'
import amlodipine from '../data/medicines-Amlodipine.json'


const medicines = Page1Meds.significantLink.map(link => link)

const usersMedicines = Page1Meds.significantLink.filter(link => {
  return (link.name === 'Amlodipine' || link.name === 'Bumetanide')
})

const userMedicineDetails = amlodipine;

export default {
  medicines,
  usersMedicines,
  userMedicineDetails
}

