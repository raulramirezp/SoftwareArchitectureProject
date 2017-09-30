class Category < ApplicationRecord
  has_many :events

  validates :description, presence:true
end
