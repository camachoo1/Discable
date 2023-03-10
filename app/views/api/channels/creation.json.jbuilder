json.channel do
  # json.partial! "api/channels/channel", channel: @channel
  json.extract! channel, :id, :channel_name, :server_id, :channel_type
  json.messages channel.message_collector
end

json.messages do
  channel.messages.each do |message|
    json.set! message.id do
      json.partial! "api/messages/message", message: message
    end
  end
end
