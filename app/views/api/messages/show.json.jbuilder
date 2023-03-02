json.message do
  json.extract! @message, :id, :author_id, :channel_id, :body, :created_at, :updated_at
end
