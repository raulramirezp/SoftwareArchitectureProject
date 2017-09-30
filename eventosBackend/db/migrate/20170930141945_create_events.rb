class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.integer :assistants
      t.references :category, foreign_key: true
      t.references :user, foreign_key: true
      t.string :visibility
      t.string :eventType
      t.integer :minAge
      t.string :place

      t.timestamps
    end
  end
end
