class CreateServerSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :server_subscriptions do |t|
      t.references :user, null: false, foreign_key: true, index: false
      t.references :server, null: false, foreign_key: true
      t.index [:user_id, :server_id], unique: true

      t.timestamps
    end
  end
end
