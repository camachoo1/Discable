class Message < ApplicationRecord
  belongs_to :author
  belongs_to :channel
  belongs_to :parent
end
