# json.partial! 'api/servers/server', server: @server
json.server do
  json.extract! @server, :id, :server_name, :owner_id
  json.users @server.user_collector
  json.channels @server.channel_collector
  json.default_channel @server.channels[0].id
end

json.serverSubscriptions do
  @server.server_subscriptions.each do |ss|
    json.set! ss.id do
      json.extract! ss, :id, :user_id, :server_id
    end
  end
end

json.users do
  @server.users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username, :email, :tag, :status
    end
  end
end

json.channels do
  @server.channels.each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :channel_name, :server_id, :channel_type
    end
  end
end
