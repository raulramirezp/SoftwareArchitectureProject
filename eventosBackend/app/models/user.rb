class User < ApplicationRecord
  belongs_to :authentication
  has_many :participants
  has_many :invitations
  has_many :events, :through => :participants
end
