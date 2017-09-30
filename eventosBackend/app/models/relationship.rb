class Relationship < ApplicationRecord
  belongs_to :user
  belongs_to :invited, :class_name => 'User'

  validates :user_id, presence: true
  validates :invited_id, presence: true
end
