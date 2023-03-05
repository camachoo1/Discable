# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  status          :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  tag             :string           not null
#
class User < ApplicationRecord
  has_secure_password
  validates :session_token, presence: true, uniqueness: true
  validates :username, length: { minimum: 3, maximum: 30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: "Can't be an email" }
  validates :email, length: { minimum: 3, maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :tag, presence: true, length: { is: 4 }
  validates :username, uniqueness: { scope: :tag }
  validates :password, length: { in: 6..225 }, allow_nil: true
  validates :status, inclusion: { in: ["online", "away", "offline"] }
  before_validation :ensure_session_token

  has_many :server_subscriptions,
    foreign_key: :user_id,
    class_name: :ServerSubscription,
    dependent: :destroy

  has_many :servers,
    through: :server_subscriptions,
    source: :server,
    dependent: :destroy

  has_many :owned_servers,
    foreign_key: :owner_id,
    class_name: :Server,
    dependent: :destroy

  has_many :messages,
    foreign_key: :author_id,
    class_name: :Message,
    dependent: :destroy

  has_many :sent_requests,
    foreign_key: :user1_id,
    class_name: :Friend,
    dependent: :destroy

  has_many :received_requests,
    foreign_key: :user2_id,
    class_name: :Friend,
    dependent: :destroy

  def self.find_by_credentials(credential, password)
    if credential.include?("@")
      user = User.find_by(email: credential)
      return user if user&.authenticate(password)
    else
      user = User.find_by(username: credential)
      return user if user&.authenticate(password)
    end
    nil
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def friends
    Friend.where("user1_id = ? OR user2_id = ?", self.id, self.id)
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    token = SecureRandom.urlsafe_base64
    token = SecureRandom.urlsafe_base64 while User.exists?(session_token: token)
    token
  end
end
