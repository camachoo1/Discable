@friends.each do |friend|
  json.set! friend.id do
    json.extract! friend, :id, :status, :created_at, :updated_at
    if friend.user1_id == current_user.id
      json.friend do
        json.extract! User.find(friend.user2_id), :id, :username, :email, :status, :tag
        json.user1_id friend.user1_id
      end
    else
      json.friend do
        json.extract! User.find(friend.user1_id), :id, :username, :email, :status, :tag
        json.user2_id friend.user2_id
      end
    end
  end
end
