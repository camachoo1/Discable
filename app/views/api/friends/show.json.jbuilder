friend_data = {
  id: friend.id,
  status: friend.status,
  created_at: friend.created_at,
  updated_at: friend.updated_at,
  dm_channel_id: friend.dm_channel.id,
}

if friend.user1_id != current_user.id
  friend_data[:friend] = User.find(friend.user2_id).slice(:id, :username, :email, :status, :tag)
  friend_data[:user1_id] = friend.user1_id
else
  friend_data[:friend] = User.find(friend.user1_id).slice(:id, :username, :email, :status, :tag)
  friend_data[:user2_id] = friend.user2_id
end

json.set! friend.id, friend_data
