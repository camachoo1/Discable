json.user do
  json.partial! "api/users/user", user: @user
  if @user
    json.servers do
      @user.servers.each do |server|
        json.set! server.id do
          json.extract! server, :id, :server_name, :owner_id, :created_at
        end
      end
    end
  end
end
