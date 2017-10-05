class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :invited, :class_name => 'User'
  belongs_to :event

  validates :user_id, presence: true
  validates :invited_id, presence: true
  validates :event_id, presence: true
end
