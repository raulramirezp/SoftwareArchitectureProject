class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :lastname
      t.string :nickname
      t.datetime :birthdate
      t.string :email

      t.timestamps
    end
  end
end
