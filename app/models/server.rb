# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  server_name :string           not null
#  owner_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
  validates :server_name, presence: true, uniqueness: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :server_subscriptions,
    foreign_key: :server_id,
    class_name: :ServerSubscription,
    dependent: :destroy

  has_many :users,
    through: :server_subscriptions,
    source: :user,
    dependent: :destroy

  has_many :channels,
    foreign_key: :server_id,
    class_name: :Channel,
    dependent: :destroy

  def user_collector
    # self.users.map { |u| u.id }
    self.server_subscriptions.map { |ss| ss.id }
  end
end
