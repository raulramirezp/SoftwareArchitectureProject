class Authentication < ApplicationRecord
  belongs_to :user
  #has_secure_password
  has_secure_token

  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :password_digest, presence: true
end
