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