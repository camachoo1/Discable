json.extract! friend, :id, :created_at, :updated_at, :status

friendship = {
  id: nil,
  username: nil,
  email: nil,
  status: nil,
  tag: nil,
  created_at: nil,
}

if friend.user1_id != current_user.id
  friend2 = User.select(:id, :username, :email, :status, :tag, :created_at).find(friend.user2_id)
  friendship[:id] = friend2.id
  friendship[:username] = friend2.username
  friendship[:email] = friend2.email
  friendship[:status] = friend2.status
  friendship[:tag] = friend2.tag
  friendship[:created_at] = friend2.created_at
  json.friendship do
    json.merge!(friendship)
    json.user1_id friend.user1_id
  end
else
  friend1 = User.select(:id, :username, :email, :status, :tag, :created_at).find(friend.user1_id)
  friendship[:id] = friend1.id
  friendship[:username] = friend1.username
  friendship[:email] = friend1.email
  friendship[:status] = friend1.status
  friendship[:tag] = friend1.tag
  friendship[:created_at] = friend1.created_at
  json.friendship do
    json.merge!(friendship)
    json.user2_id friend.user2_id
  end
end

json.dm_channel_id friend&.dm_channel&.id
