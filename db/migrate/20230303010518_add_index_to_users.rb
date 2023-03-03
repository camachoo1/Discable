class AddIndexToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, [:tag, :username], unique: true
  end
end
