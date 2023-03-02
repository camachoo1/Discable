json.channel do
  json.extract! @channel, :id, :channel_name, :server_id, :channel_type
  # json.users @server.user_collector
end
