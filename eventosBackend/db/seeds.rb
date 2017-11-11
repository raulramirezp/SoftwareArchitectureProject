# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
ActiveRecord::Base.connection.execute("ALTER TABLE users AUTO_INCREMENT = 1;")

User.create!(name:"Cristian", lastname: "Lozano", nickname: "clozano", email: "cclozanoj@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Diana", lastname: "Navarrete", nickname: "dnavarrete", email: "dcnavarreter@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Alejandra", lastname: "Zaldua", nickname: "azaldua", email: "dzalduar@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Edilberto", lastname: "Canon", nickname: "ecanon", email: "ecanonp@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Camilo", lastname: "Neiva", nickname: "cneiva", email: "jcneivaa@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Juan", lastname: "Cuestas", nickname: "jcuestas", email: "jmcuestasb@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Jonas", lastname: "Ortiz", nickname: "jortiz", email: "joaortizro@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Jose", lastname: "Molano", nickname: "jmolano", email: "jrmolanor@unal.edu.co", birthdate: "1990-02-02")
User.create!(name:"Luis", lastname: "Alfonso", nickname: "lalfonso", email: "luealfonsoru@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Oscar", lastname: "Parra", nickname: "oparra", email: "odparraj@unal.edu.co", birthdate: "1990-05-05")
User.create!(name:"Raul", lastname: "Ramirez", nickname: "rramirez", email: "raaramirezpe@unal.edu.co", birthdate: "1990-03-03")
User.create!(name:"Santiago", lastname: "Blanco", nickname: "sblanco", email: "sablancom@unal.edu.co", birthdate: "1990-04-04")
User.create!(name:"Sergio", lastname: "Castro", nickname: "scastro", email: "sacastroc@unal.edu.co", birthdate: "1990-01-01")
# User.create!(name:"Richard", lastname: "Herrera", nickname: "rherrera", email: "rherrera@unal.edu.co", birthdate: "1990-05-20")
# User.create!(name:"Alejandro", lastname: "Arias", nickname: "aarias", email: "aarias@unal.edu.co", birthdate: "1990-07-14")
# User.create!(name:"Andres", lastname: "Arango", nickname: "aarango", email: "andres@mail.com", birthdate: "1990-01-22")

Authentication.destroy_all
ActiveRecord::Base.connection.execute("ALTER TABLE authentications AUTO_INCREMENT = 1;")

Authentication.create!(user_id:"1",password_digest:"123456")
Authentication.create!(user_id:"2",password_digest:"123456")
Authentication.create!(user_id:"3",password_digest:"123456")
Authentication.create!(user_id:"4",password_digest:"123456")
Authentication.create!(user_id:"5",password_digest:"123456")
Authentication.create!(user_id:"6",password_digest:"123456")
Authentication.create!(user_id:"7",password_digest:"123456")
Authentication.create!(user_id:"8",password_digest:"123456")
Authentication.create!(user_id:"9",password_digest:"123456")
Authentication.create!(user_id:"10",password_digest:"123456")
Authentication.create!(user_id:"11",password_digest:"123456")
Authentication.create!(user_id:"12",password_digest:"123456")
Authentication.create!(user_id:"13",password_digest:"123456")
# Authentication.create!(user_id:"5",password_digest:"123456")

Category.destroy_all
ActiveRecord::Base.connection.execute("ALTER TABLE categories AUTO_INCREMENT = 1;")

Category.create!(description: "Fiesta")
Category.create!(description: "Conferencia")
Category.create!(description: "Charla")
Category.create!(description: "Concierto")
Category.create!(description: "Convención")
Category.create!(description: "Desayuno")
Category.create!(description: "Almuerzo")
Category.create!(description: "Comida")
Category.create!(description: "Junta")
Category.create!(description: "Feria")
Category.create!(description: "Congreso")
Category.create!(description: "Seminario")
Category.create!(description: "Torneo")
Category.create!(description: "Partido")
