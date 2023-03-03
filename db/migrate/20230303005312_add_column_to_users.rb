class AddColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :tag, :string, null: false
  end
end
