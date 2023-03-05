# == Schema Information
#
# Table name: friends
#
#  id         :bigint           not null, primary key
#  user1_id   :bigint           not null
#  user2_id   :bigint           not null
#  status     :string           default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friend < ApplicationRecord
  validates :status, inclusion: { in: ["pending", "friends", "blocked"] }
  validates :user1_id, uniqueness: { scope: :user2_id }
  validates :user2_id, uniqueness: { scope: :user1_id }

  belongs_to :sender,
    foreign_key: :user1_id,
    class_name: :User

  belongs_to :receiver,
    foreign_key: :user2_id,
    class_name: :User
end
