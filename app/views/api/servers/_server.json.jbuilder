json.extract! server, :id, :server_name, :owner_id

json.users do
  server.users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
      json.subcription_id ServerSubscription.find_by(user_id: user.id, server_id: server.id).id if server
    end
  end
end
