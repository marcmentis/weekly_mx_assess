class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :authen
      t.string :facility
      t.string :email
      t.string :firstinitial
      t.string :middleinitial
      t.string :updated_by

      t.timestamps
    end
    add_index :users, :facility
    add_index :users, :authen
    add_index(:users, [:facility, :authen], name: 'facility-lastname')
  end
end
