json.extract! @channel, :id, :channel_name, :server_id, :channel_type
json.dm_user do
  json.extract! *@channel.dm_users.select { |user| user != current_user }, :id, :username, :tag
end

json.users do
  @dm_users.each do |dm_user|
    json.set! dm_user.id do
      json.extract! dm_user, :id, :username, :tag, :status
    end
  end
end
