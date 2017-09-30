class CreateEventdates < ActiveRecord::Migration[5.1]
  def change
    create_table :eventdates do |t|
      t.datetime :beginAt
      t.datetime :endAt
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end
