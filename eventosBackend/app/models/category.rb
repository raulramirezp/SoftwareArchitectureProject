class Category < ApplicationRecord
  has_many :events, dependent: :destroy

  validates :description, presence:true
end
