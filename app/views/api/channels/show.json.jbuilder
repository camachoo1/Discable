json.channel do
  json.extract! @channel, :id, :channel_name, :server_id, :channel_type
  # json.users @server.user_collector
end

# json.users do
#   @channel.users.each do |user|
#     json.set! user.id do
#       json.extract! user, :id, :username, :email, :status
#     end
#   end
# end

# json.channelSubscriptions do
#   @channel.channel_subscriptions.each do |cs|
#     json.set! cs.id do
#       json.extract! cs, :id, :channel_id, :server_id
#     end
#   end
# end
