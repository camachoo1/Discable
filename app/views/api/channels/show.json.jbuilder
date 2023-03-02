json.channel do
  json.extract! @channel, :id, :channel_name, :server_id, :channel_type
  json.messages @channel.message_collector
end
