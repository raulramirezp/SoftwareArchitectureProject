class CreateEvendates < ActiveRecord::Migration[5.1]
  def change
    create_table :evendates do |t|
      t.datetime :beginat
      t.datetime :endat
      t.string :place
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end
