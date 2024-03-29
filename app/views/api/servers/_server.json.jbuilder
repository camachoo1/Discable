json.extract! server, :id, :server_name, :owner_id

json.users do
  server.users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
      json.subscription_id ServerSubscription.find_by(user_id: user.id, server_id: server.id).id if server
    end
  end
end

json.default_channel do
  channel = Channel.find_by(channel_name: "general")
  json.partial! "api/channels/channel", channel: channel
end
