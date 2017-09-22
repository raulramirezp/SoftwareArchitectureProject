class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :lastname
      t.string :nickname
      t.string :gender
      t.datetime :birthdate
      t.references :authentication, foreign_key: true

      t.timestamps
    end
  end
end
