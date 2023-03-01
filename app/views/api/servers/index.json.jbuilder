# @servers.each do |server|
#   json.set! server.id do
#     json.partial! "api/servers/server", server: server
#   end
# end

json.servers do
  @servers.each do |server|
    json.set! server.id do
      json.extract! server, :id, :server_name, :owner_id
    end
  end
end

# json.serverSubscriptions do
#   @servers.each do |server|
#     json.set! ss.id do
#       json.extract! ss, :id, :user_id, :server_id
#     end
#   end
# end
