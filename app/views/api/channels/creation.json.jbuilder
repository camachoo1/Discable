json.channel do
  # debugger
  # json.partial! "api/channels/channel", channel: @channel
  json.extract! channel, :id, :channel_name, :server_id, :channel_type
  json.messages channel.message_collector
end
# temp = @channel || channel
json.messages do
  channel.messages.each do |message|
    # debugger
    json.set! message.id do
      json.partial! "api/messages/message", message: message
    end
  end
end
