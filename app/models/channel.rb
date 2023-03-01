class Channel < ApplicationRecord
  validates :channel_name, presence: true
  validates :channel_type, inclusion: { in: ["public", "private"] }

  belongs_to :server,
    foreign_key: :server_id,
    class_name: :Server,
    optional: true
end
