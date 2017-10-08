# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171002161544) do

  create_table "authentications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "user_id"
    t.string "token"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_authentications_on_token"
    t.index ["user_id"], name: "index_authentications_on_user_id", unique: true
  end

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "description"
    t.string "imagen"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.integer "assistants"
    t.bigint "category_id"
    t.bigint "user_id"
    t.boolean "isPrivate"
    t.integer "minAge"
    t.string "place"
    t.datetime "beginAt"
    t.datetime "endAt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_events_on_category_id"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "follows", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "followable_type"
    t.integer "followable_id"
    t.string "follower_type"
    t.integer "follower_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followable_id", "followable_type"], name: "index_partisan_followables"
    t.index ["followable_type", "followable_id"], name: "index_follows_on_followable_type_and_followable_id"
    t.index ["follower_id", "follower_type", "followable_id"], name: "index_partisan_unique_follow", unique: true
    t.index ["follower_id", "follower_type"], name: "index_partisan_followers"
    t.index ["follower_type", "follower_id"], name: "index_follows_on_follower_type_and_follower_id"
  end

  create_table "friendships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
    t.index ["user_id"], name: "index_friendships_on_user_id"
  end

  create_table "invitations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "invited_id"
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_invitations_on_event_id"
    t.index ["invited_id"], name: "index_invitations_on_invited_id"
    t.index ["user_id"], name: "index_invitations_on_user_id"
  end

  create_table "relationships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "invited_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invited_id"], name: "index_relationships_on_invited_id"
    t.index ["user_id"], name: "index_relationships_on_user_id"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "lastname"
    t.string "nickname"
    t.datetime "birthdate"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["nickname"], name: "index_users_on_nickname", unique: true
  end

  add_foreign_key "events", "categories"
  add_foreign_key "events", "users"
  add_foreign_key "invitations", "events"
end
