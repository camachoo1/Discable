class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :channel_name, null: false
      t.references :server, foreign_key: true
      t.string :channel_type, null: false, default: "public"
      t.timestamps
    end
  end
end
