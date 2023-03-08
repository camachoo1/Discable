# friends_data = @friends.map do |friend|
#   friend_data = {
#     id: friend.id,
#     status: friend.status,
#     dm_channel_id: friend.dm_channel.id,
#   }

#   if friend.user1_id == current_user.id
#     friend_data[:friend] = User.find(friend.user2_id).slice(:id, :username, :email, :status, :tag)
#     friend_data[:user1_id] = friend.user1_id
#   else
#     friend_data[:friend] = User.find(friend.user1_id).slice(:id, :username, :email, :status, :tag)
#     friend_data[:user2_id] = friend.user2_id
#   end

#   friend_data
# end

# json.array! friends_data, :id do |friend_data|
#   json.extract! friend_data, :id, :status, :dm_channel_id
#   json.friend do
#     json.extract! friend_data[:friend], :id, :username, :email, :status, :tag
#     json.user1_id friend_data[:user1_id] if friend_data[:user1_id]
#     json.user2_id friend_data[:user2_id] if friend_data[:user2_id]
#   end
# end

json.friends do
  @friends.each do |friend|
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
  # debugger
  friends_arr.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :email, :username, :tag, :status, :created_at, :updated_at
    end
  end
end
