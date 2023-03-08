# == Schema Information
#
# Table name: channel_subscriptions
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  channel_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChannelSubscription < ApplicationRecord
  validates :user_id, uniqueness: { scope: :channel_id }

  belongs_to :user

  belongs_to :channel
end
