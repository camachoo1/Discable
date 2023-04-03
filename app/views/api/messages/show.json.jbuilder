json.extract! message, :id, :body, :author_id, :channel_id, :created_at, :updated_at
json.user do
  json.partial! "api/users/user", user: message.author
end
