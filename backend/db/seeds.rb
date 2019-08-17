# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

UserMedicine.destroy_all

UserMedicine.create(
  name: "Amlodipine",
  user_id: 1,
  dose: 20,
  morning: true,
  evening: false,
  url: "https://www.nhs.uk/medicines/amlodipine/",
  composite_id: "https://www.nhs.uk/medicines/amlodipine/-20-A"
)

# UserMedicine.create(
#   name: "Aspirin",
#   user_id: 1,
#   dose: 10,
#   morning: true,
#   evening: false,
#   url: "https://www.nhs.uk/medicines/low-dose-aspirin/",
#   composite_id: "https://www.nhs.uk/medicines/low-dose-aspirin/-20-A",
  # history: {
  #   "08/11/2019": {
  #     clicked: {
  #       AM: true
  #     }
  #     status: {
  #       AM: true
  #     }
  #   },
  #   "08/12/2019": {
  #     clicked: {
  #       AM: true
  #     }
  #     status: {
  #       AM: true
  #     }
  #   },
  #  "08/13/2019": {
  #     clicked: {
  #       AM: true
  #     }
  #     status: {
  #       AM: false
  #     }
  #   }
  # }
# )

# UserMedicine.create(
#   name: "Metoprolol",
#   user_id: 1,
#   dose: 40,
#   morning: true,
#   evening: true,
#   url: "https://www.nhs.uk/medicines/metoprolol/",
#   composite_id: "https://www.nhs.uk/medicines/metoprolol/-40-A-P",
  # history: {
  #   "08/11/2019": {
  #     clicked: {
  #       AM: true,
        # PM: false
  #     }
  #     status: {
  #       AM: true,
        # PM: false
  #     }
  #   },
  #   "08/12/2019": {
  #     clicked: {
  #       AM: true, PM: true
  #     }
  #     status: {
  #       AM: true, PM: true
  #     }
  #   },
  #  "08/13/2019": {
  #     clicked: {
  #       AM: true, PM: true
  #     }
  #     status: {
  #       AM: false, PM: false
  #     }
  #   }
  # }
# )

# UserMedicine.create(
#   name: "Clopidogrel",
#   user_id: 1,
#   dose: 30,
#   morning: true,
#   evening: false,
#   url: "https://www.nhs.uk/medicines/clopidogrel/",
#   composite_id: "https://www.nhs.uk/medicines/clopidogrel/-30-A"
# )

# UserMedicine.create(
#   name: "Atorvastatin",
#   user_id: 1,
#   dose: 40,
#   morning: true,
#   evening: false,
#   url: "https://www.nhs.uk/medicines/atorvastatin/",
#   composite_id: "https://www.nhs.uk/medicines/atorvastatin/-40-A"
# )

# UserMedicine.create(
#   name: "Enalapril",
#   user_id: 1,
#   dose: 20,
#   morning: true,
#   evening: false,
#   url: "https://www.nhs.uk/medicines/enalapril/",
#   composite_id: "https://www.nhs.uk/medicines/enalapril/-20-A"
# )