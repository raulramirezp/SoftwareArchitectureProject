class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.references :user#, foreign_key: true
      t.references :invited #, Solo puedo invitar una vez a cada persona
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end
