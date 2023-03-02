# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  channel_id :bigint           not null
#  body       :text             not null
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  validates :body, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :channel

  belongs_to :parent,
    foreign_key: :parent_id,
    class_name: :Message,
    dependent: :destroy,
    optional: true
end
