json.server do
  json.extract! server, :id, :server_name, :owner_id
  json.users server.user_collector
end
# json.users do
# server.users.each do |user|
#   json.set! user.id do
#     json.partial! "api/users/user", user: user
#     json.subcription_id ServerSubscription.find_by(user_id: user.id, server_id: server.id).id if server
#   end
# end
# end

json.serverSubscriptions do
  server.server_subscriptions do |ss|
    json.set! ss.id do
      json.extract! ss, :id, :user_id, :server_id
    end
  end
end
