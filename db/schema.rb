# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150720175158) do


  create_table "for_selects", force: true do |t|
    t.string   "code"
    t.string   "value"
    t.string   "text"
    t.string   "grouper"
    t.integer  "option_order"
    t.string   "facility"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "for_selects", ["code"], name: "index_for_selects_on_code", using: :btree
  add_index "for_selects", ["facility", "code"], name: "facility-code", using: :btree
  add_index "for_selects", ["facility"], name: "index_for_selects_on_facility", using: :btree

  create_table "mx_assess_notes", force: true do |t|
    t.string   "danger_yn"
    t.string   "drugs_last_changed"
    t.string   "drugs_not_why",         limit: 4000
    t.string   "drugs_change_why",      limit: 4000
    t.string   "psychsoc_last_changed"
    t.string   "psychsoc_not_why",      limit: 4000
    t.string   "psychsoc_change_why",   limit: 4000
    t.date     "meeting_date"
    t.integer  "patient_id"
    t.string   "pre_date_yesno"
    t.string   "pre_date_no_why",       limit: 4000
    t.date     "pre_date"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "mx_assess_notes", ["patient_id"], name: "index_mx_on_patient_id", using: :btree

  create_table "mx_assessments", force: true do |t|
    t.string   "danger_yn"
    t.string   "drugs_last_changed"
    t.string   "drugs_not_why",         limit: 4000
    t.string   "drugs_change_why",      limit: 4000
    t.string   "psychsoc_last_changed"
    t.string   "psychsoc_not_why",      limit: 4000
    t.string   "psychsoc_change_why",   limit: 4000
    t.date     "meeting_date"
    t.integer  "patient_id"
    t.string   "pre_date_yesno"
    t.string   "pre_date_no_why",       limit: 4000
    t.date     "pre_date"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "patients", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "identifier"
    t.string   "facility"
    t.string   "site"
    t.date     "doa"
    t.date     "dob"
    t.date     "dod"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "patients", ["facility", "site", "lastname"], name: "facility-site-lastname", using: :btree
  add_index "patients", ["facility", "site"], name: "facility-site", using: :btree
  add_index "patients", ["facility"], name: "index_patients_on_facility", using: :btree
  add_index "patients", ["identifier"], name: "index_patients_on_identifier", using: :btree
  add_index "patients", ["lastname"], name: "index_patients_on_lastname", using: :btree
  add_index "patients", ["site"], name: "index_patients_on_site", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "name_restype_res_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "users", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "authen"
    t.string   "facility"
    t.string   "email"
    t.string   "firstinitial"
    t.string   "middleinitial"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["authen"], name: "index_users_on_authen", using: :btree
  add_index "users", ["facility", "authen"], name: "facility-lastname", using: :btree
  add_index "users", ["facility"], name: "index_users_on_facility", using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "roles_userid_roleid", using: :btree

end
