class Event < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :users, through: :event_invite
  has_many :users, through: :participant
end
