class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.integer :assistants
      t.references :category, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :isPrivate
      t.integer :minAge
      t.string :place
      t.datetime :beginAt
      t.datetime :endAt

      t.timestamps
    end
  end
end
