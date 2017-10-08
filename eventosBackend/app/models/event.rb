class Event < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :invitations, dependent: :destroy
  has_many :users, through: :event_invite, dependent: :destroy
  has_many :users, through: :invitations, dependent: :destroy

  acts_as_followable

  validates :name, presence: true
  validates :assistants, presence: true, numericality: { only_integer: true }
  validates :category_id, presence: true
  validates :user_id, presence: true
  validates :isPrivate, inclusion: { in: [ true, false ] }
  validates :minAge, presence: true
  validates :place, presence: true
  validates :beginAt, presence: true
  validates :endAt, presence: true

  def self.find_coincidences(str)
    where("name like ?", "%#{str}%")
  end
end
