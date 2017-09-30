class Relationship < ApplicationRecord
  belongs_to :user
  belongs_to :invited, :class_name => 'User'
end
