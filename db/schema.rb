# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_05_093050) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_subscriptions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "channel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_subscriptions_on_channel_id"
    t.index ["user_id", "channel_id"], name: "index_channel_subscriptions_on_user_id_and_channel_id", unique: true
  end

  create_table "channels", force: :cascade do |t|
    t.string "channel_name", null: false
    t.bigint "server_id"
    t.string "channel_type", default: "public", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "friends", force: :cascade do |t|
    t.bigint "user1_id", null: false
    t.bigint "user2_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user1_id"], name: "index_friends_on_user1_id"
    t.index ["user2_id"], name: "index_friends_on_user2_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.bigint "channel_id", null: false
    t.text "body", null: false
    t.bigint "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["channel_id"], name: "index_messages_on_channel_id"
    t.index ["parent_id"], name: "index_messages_on_parent_id"
  end

  create_table "server_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_server_subscriptions_on_server_id"
    t.index ["user_id", "server_id"], name: "index_server_subscriptions_on_user_id_and_server_id", unique: true
  end

  create_table "servers", force: :cascade do |t|
    t.string "server_name", null: false
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_servers_on_owner_id"
    t.index ["server_name"], name: "index_servers_on_server_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "status", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tag", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["tag", "username"], name: "index_users_on_tag_and_username", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "channel_subscriptions", "channels"
  add_foreign_key "channel_subscriptions", "users"
  add_foreign_key "channels", "servers"
  add_foreign_key "friends", "users", column: "user1_id"
  add_foreign_key "friends", "users", column: "user2_id"
  add_foreign_key "messages", "channels"
  add_foreign_key "messages", "messages", column: "parent_id"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "server_subscriptions", "servers"
  add_foreign_key "server_subscriptions", "users"
  add_foreign_key "servers", "users", column: "owner_id"
end
