# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
ActiveRecord::Base.connection.execute("ALTER TABLE users AUTO_INCREMENT = 1;")

User.create!(name:"Sergio", lastname: "Castro", nickname: "scastro", email: "sergio@mail.com", birthdate: "1990-01-01")
User.create!(name:"Jose", lastname: "Molano", nickname: "jmolano", email: "jose@mail.com", birthdate: "1990-02-02")
User.create!(name:"Raul", lastname: "Ramirez", nickname: "rramirez", email: "raul@mail.com", birthdate: "1990-03-03")
User.create!(name:"Santiago", lastname: "Blanco", nickname: "sblanco", email: "santiago@mail.com", birthdate: "1990-04-04")
User.create!(name:"Luis", lastname: "Alfonso", nickname: "lalfonso", email: "luis@mail.com", birthdate: "1990-05-05")

Authentication.destroy_all
ActiveRecord::Base.connection.execute("ALTER TABLE authentications AUTO_INCREMENT = 1;")

Authentication.create!(user_id:"1",password_digest:"123456")
Authentication.create!(user_id:"2",password_digest:"123456")
Authentication.create!(user_id:"3",password_digest:"123456")
Authentication.create!(user_id:"4",password_digest:"123456")
Authentication.create!(user_id:"5",password_digest:"123456")
