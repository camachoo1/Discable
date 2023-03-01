json.channels do
  @channels.each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :channel_name, :server_id
    end
  end
end
