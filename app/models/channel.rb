# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  channel_name :string           not null
#  server_id    :bigint
#  channel_type :string           default("public"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Channel < ApplicationRecord
  validates :channel_name, presence: true
  validates :channel_type, inclusion: { in: ["public", "private"] }

  belongs_to :server,
    foreign_key: :server_id,
    class_name: :Server,
    optional: true

  has_many :messages,
    foreign_key: :channel_id,
    class_name: :Message,
    dependent: :destroy

  has_many :dm_user_subscriptions,
    foreign_key: :channel_id,
    class_name: :ChannelSubscription,
    dependent: :destroy

  has_many :dm_users,
    through: :dm_user_subscriptions,
    source: :user,
    dependent: :destroy

  def message_collector
    self.messages.map { |msg| msg.id }
  end
end
