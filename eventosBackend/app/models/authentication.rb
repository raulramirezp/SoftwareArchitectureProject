class Authentication < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :password_digest, presence: true
end
