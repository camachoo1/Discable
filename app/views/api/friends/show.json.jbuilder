json.extract! friend, :id, :created_at, :updated_at, :status
if friend.user1_id != current_user.id
  json.friend do
    json.extract! User.find(friend.user2_id), :id, :username, :email, :status, :tag, :created_at
    json.user1_id friend.user1_id
  end
else
  json.friend do
    json.extract! User.find(friend.user1_id), :id, :username, :email, :status, :tag, :created_at
    json.user2_id friend.user2_id
  end
end
