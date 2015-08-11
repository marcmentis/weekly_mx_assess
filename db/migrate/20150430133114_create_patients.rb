class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :firstname
      t.string :lastname
      t.string :identifier
      t.string :facility
      t.string :site
      t.date :doa
      t.date :dob
      t.date :dod
      t.string :updated_by

      t.timestamps
    end
    add_index :patients, :facility
    add_index :patients, :site
    add_index :patients, :lastname
    add_index :patients, :identifier
    add_index(:patients, [:facility, :site], name: 'facility-site')
    add_index(:patients, [:facility, :site, :lastname], name: 'facility-site-lastname')
  end
end
