class AddIndexToAuthentications < ActiveRecord::Migration[5.1]
  def change
  	add_index :authentications, :token
  end
end
