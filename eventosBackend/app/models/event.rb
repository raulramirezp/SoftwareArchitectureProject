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
  def self.search(search)
    where('name LIKE ?',"%#{search}%")
  end
  def self.returnCategory(value)
    if value == ''
        return '%'
    else
        return value
    end
  end    
  def self.returnBoolean(value)
    if value == 'true'
        return true
    elsif value == 'false'
        return false
    else
        return '%'
    end
  end
  def self.advancedSearch(search)
    searchArray = search.split(",")
    puts searchArray
    for i in 0..4
        if searchArray[i]=="null"
            puts i, "null"
            searchArray[i]=''
            if i == 3 or i == 4
                searchArray[3]='2017-01-01 01:00:00'
                searchArray[4]='2020-12-31 22:00:00'
            end
        else
            if i == 3 or i == 4
                puts i
                searchArray[3]=searchArray[3][0,10]+' '+searchArray[3][11,searchArray[3].length]
                searchArray[4]=searchArray[4][0,10]+' '+searchArray[4][11,searchArray[4].length]
            end
        end
    end
    puts searchArray
    where("name LIKE ? AND category_id LIKE ? AND isPrivate LIKE ? AND (beginAt BETWEEN ? AND ?)", "%#{searchArray[0]}%", returnCategory(searchArray[1]), returnBoolean(searchArray[2]), "#{searchArray[3]}", "#{searchArray[4]}" )
  end        
end
#tempName, category_id, isPrivate, beginAt, endAt
