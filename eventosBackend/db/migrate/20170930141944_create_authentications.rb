class CreateAuthentications < ActiveRecord::Migration[5.1]
  def change
    create_table :authentications do |t|
      t.integer :user_id
      t.string :token
      t.string :password_digest

      t.timestamps
    end
  end
end
