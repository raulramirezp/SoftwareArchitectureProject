class AddAdsToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :ads, :text
  end
end
