json.friends do
  @friends.each do |friend|
    # debugger
    json.set! friend[:id] do
      json.status friend[:status]
      json.user_id friend[:user_id]
      json.dm_channel_id friend[:dm_channel_id]
      json.id friend[:id]
    end
  end
end

friends_arr = @friends.map { |friend| friend[:user_id] }.map { |user_id| User.find(user_id) }

json.users do
  friends_arr.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :email, :username, :tag, :status, :created_at, :updated_at
    end
  end
end
