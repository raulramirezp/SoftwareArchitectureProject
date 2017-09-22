class Event < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_one :evendate
  has_many :invitations
  has_many :participants
  has_many :users, :through => :participants
end
