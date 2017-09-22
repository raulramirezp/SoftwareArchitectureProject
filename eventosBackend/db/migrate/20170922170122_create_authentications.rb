class CreateAuthentications < ActiveRecord::Migration[5.1]
  def change
    create_table :authentications do |t|

      t.timestamps
    end
  end
end
