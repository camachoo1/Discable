json.server do
  json.extract! server, :id, :server_name, :owner_id
  json.users server.user_collector
end

json.serverSubscriptions do
  server.server_subscriptions do |ss|
    json.set! ss.id do
      json.extract! ss, :id, :user_id, :server_id
    end
  end
end
