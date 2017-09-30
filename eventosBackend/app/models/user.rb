class User < ApplicationRecord
  has_many :events
  has_many :users, :source => :relationship, :through => :relationship
  has_many :users, :source => :friendship, :through => :friendship
  has_many :events, through: :event_invite
  has_many :events, through: :participant

  def invite(u)
    if Relationship.exists?(user_id: u.id, invited_id: self.id)
      p "Ya hay una solicitud de esta persona"
    else
      @r = Relationship.new(user_id: self.id, invited_id: u.id)
      if @r.valid?
        @r.save
      else
        @r.errors.messages
      end
    end

  end

  def acept(u)
    if Relationship.exists?(user_id: u.id, invited_id: self.id)
      @r = Friendship.new(user_id: self.id, friend_id: u.id)
      @r.save
      @p = Friendship.new(user_id: u.id, friend_id: self.id)
      @p.save
      @r = Relationship.where(user_id: u.id, invited_id: self.id)
      @r.delete_all
    else
      p "No hay solicitud"
    end
  end

  def decline(u)
    if Relationship.exists?(user_id: u.id, invited_id: self.id)
      @r = Relationship.where(user_id: u.id, invited_id: self.id)
      @r.delete_all
    else
      p "No hay solicitud"
    end
  end

  def remove(u)
    if Friendship.exists?(user_id: self.id, friend_id: u.id)
      @r = Friendship.where(user_id: self.id, friend_id: u.id)
      @r.delete_all
      @r = Friendship.where(user_id: u.id, friend_id: self.id)
      @r.delete_all
    else
      p "No son amigos"
    end
  end

  def requests
    Relationship.includes(:user).where(invited_id: self.id)
    r = Relationship.includes(:user).where(invited_id: self.id)
    @names = []
    r.each do |n|
      k = User.where(id: n.user_id)
      @names.push k[0]
    end
    p @names
  end

  def invited
    r = Relationship.includes(:user).where(user_id: self.id)
    @names = []
    r.each do |n|
      k = User.where(id: n.invited_id)
      @names.push k[0]
    end
    p @names
  end

  def friends
    f = Friendship.includes(:user).where(user_id: self.id)
    @names = []
    f.each do |n|
      k = User.where(id: n.friend_id)
      @names.push k[0]
    end
    p @names
  end

  def friends_names
    r = Friendship.includes(:user).where(user_id: self.id)
    @names = []
    r.each do |n|
      k = User.where(id: n.friend_id).select("name")
      @names.push k[0].name
    end
    p @names
  end
end
