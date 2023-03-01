# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Destroying all previous data..."
User.destroy_all
Server.destroy_all
ServerSubscription.destroy_all
Channel.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!("users")
ApplicationRecord.connection.reset_pk_sequence!("servers")
ApplicationRecord.connection.reset_pk_sequence!("server_subscriptions")
ApplicationRecord.connection.reset_pk_sequence!("channels")

puts "Creating Users…"
user1 = User.create!(username: "Demo", email: "demo@demo.com", password: "password", status: "online")
user2 = User.create!(username: "Omar", email: "omar@gmail.com", password: "password", status: "online")
user3 = User.create!(username: "Paulo", email: "paulo@gmail.com", password: "password", status: "online")
user4 = User.create!(username: "Chris", email: "chris@gmail.com", password: "password", status: "online")
user5 = User.create!(username: "Mike", email: "mike@gmail.com", password: "password", status: "online")
user6 = User.create!(username: "Jason", email: "jason@gmail.com", password: "password", status: "online")
user7 = User.create!(username: "Stan", email: "stan@gmail.com", password: "password", status: "online")

puts "Creating Servers…"
my_demo_server = Server.create!(server_name: "Demo Server", owner_id: user1.id)
personal_server = Server.create!(server_name: "Coding", owner_id: user2.id)
best_cohort = Server.create!(server_name: "November Cohort", owner_id: user3.id)
keyboard_stuff = Server.create!(server_name: "Keyboard Stuff", owner_id: user4.id)

puts "Creating Server Subscriptions…"
ServerSubscription.create!(user_id: user1.id, server_id: my_demo_server.id)
ServerSubscription.create!(user_id: user2.id, server_id: my_demo_server.id)
ServerSubscription.create!(user_id: user3.id, server_id: my_demo_server.id)
ServerSubscription.create!(user_id: user4.id, server_id: my_demo_server.id)

ServerSubscription.create!(user_id: user1.id, server_id: personal_server.id)
ServerSubscription.create!(user_id: user2.id, server_id: personal_server.id)
ServerSubscription.create!(user_id: user3.id, server_id: personal_server.id)
ServerSubscription.create!(user_id: user4.id, server_id: personal_server.id)
ServerSubscription.create!(user_id: user5.id, server_id: personal_server.id)
ServerSubscription.create!(user_id: user6.id, server_id: personal_server.id)

ServerSubscription.create!(user_id: user1.id, server_id: best_cohort.id)
ServerSubscription.create!(user_id: user3.id, server_id: best_cohort.id)
ServerSubscription.create!(user_id: user4.id, server_id: best_cohort.id)
ServerSubscription.create!(user_id: user5.id, server_id: best_cohort.id)

ServerSubscription.create!(user_id: user1.id, server_id: keyboard_stuff.id)
ServerSubscription.create!(user_id: user2.id, server_id: keyboard_stuff.id)
ServerSubscription.create!(user_id: user6.id, server_id: keyboard_stuff.id)
ServerSubscription.create!(user_id: user7.id, server_id: keyboard_stuff.id)

puts "Creating Channels…"
channel1 = Channel.create!(channel_name: "general", server_id: my_demo_server.id)
channel2 = Channel.create!(channel_name: "random", server_id: my_demo_server.id)
channel3 = Channel.create!(channel_name: "javascript-help", server_id: my_demo_server.id)
channel4 = Channel.create!(channel_name: "rails-help", server_id: my_demo_server.id)

channel5 = Channel.create!(channel_name: "general", server_id: personal_server.id)
channel6 = Channel.create!(channel_name: "upcoming-full-stack-projects", server_id: personal_server.id)
channel7 = Channel.create!(channel_name: "random", server_id: personal_server.id)
channel8 = Channel.create!(channel_name: "job-boards", server_id: personal_server.id)

channel9 = Channel.create!(channel_name: "general", server_id: best_cohort.id)
channel10 = Channel.create!(channel_name: "progress-tracker", server_id: best_cohort.id)
channel11 = Channel.create!(channel_name: "assessment-prep", server_id: best_cohort.id)
channel12 = Channel.create!(channel_name: "solutions", server_id: best_cohort.id)

channel13 = Channel.create!(channel_name: "general", server_id: keyboard_stuff.id)
channel14 = Channel.create!(channel_name: "upcoming-events", server_id: keyboard_stuff.id)
channel15 = Channel.create!(channel_name: "group-buys", server_id: keyboard_stuff.id)
