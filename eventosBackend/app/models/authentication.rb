class Authentication < ApplicationRecord
  belongs_to :user
  #has_secure_password
  has_secure_token

  
end
