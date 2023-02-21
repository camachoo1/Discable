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
#
class User < ApplicationRecord
  has_secure_password
  validates :username, length: { minimum: 3, maximum: 30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: "Can't be an email" }, uniqueness: true
  validates :email, length: { minimum: 3, maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :status, inclusion: { in: ["online", "idle", "do not disturb", "offline"] }
  validates :password, length: { in: 6..225 }, allow_nil: true
  validates :session_token, presence: true, uniqueness: true
  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    if credential.include?("@")
      user = User.find_by(email: credential)
      return user if user&.autheticate(password)
    else
      user = User.find_by(username: credential)
      return user if user&.autheticate(password)
    end
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
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
