class Event < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_one :eventdate
  has_many :invitations
  has_many :users, through: :event_invite
  has_many :users, through: :participant

  validates :name, presence: true
  validates :assistants, presence: true, numericality: { only_integer: true }
  validates :category_id, presence: true
  validates :user_id, presence: true
  validates :visibility, presence: true
  validates :eventType, presence: true
  validates :minAge, presence: true
  validates :place, presence: true  
end
