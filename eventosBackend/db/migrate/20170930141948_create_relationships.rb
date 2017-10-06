class CreateRelationships < ActiveRecord::Migration[5.1]
  def change
    create_table :relationships do |t|
      t.references :user#, foreign_key: true
      t.references :invited#, foreign_key: true

      t.timestamps
    end
  end
end
