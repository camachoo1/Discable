@friends.each do |friend|
  json.set! friend.id do
    json.extract! friend, :id, :status, :created_at, :updated_at
  end
end
