class Eventdate < ApplicationRecord
  belongs_to :event

  validates :beginAt, presence: true
  validates :endAt, presence: true
  validates :event_id, presence: true
end
