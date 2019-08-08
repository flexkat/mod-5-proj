import Page1Meds from '../data/medicines1.json'


const medicines = Page1Meds.significantLink.map(link => link)

const usersMedicines = Page1Meds.significantLink.filter(link => {
  return (link.name === 'Adalimumab' || link.name === 'Bumetanide')
})

export default {
  medicines,
  usersMedicines
}
