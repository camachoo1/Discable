class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :status, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.index :email, unique: true
      t.index :session_token, unique: true
      t.index :username, unique: true
      t.timestamps
    end
  end
end
