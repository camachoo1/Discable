json.channel do
  json.extract! @channel, :id, :channel_name, :server_id, :channel_type
  json.messages @channel.message_collector
end

json.messages do
  @channel.messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :author_id, :channel_id, :body, :created_at, :updated_at
    end
  end
end

# json.users do
#   @channel.users
# end
