class ShortenIndexNames < ActiveRecord::Migration
  def change
  	rename_index :roles, 'index_roles_on_name_and_resource_type_and_resource_id', 'name_restype_res_id'
  	rename_index :users_roles, 'index_users_roles_on_user_id_and_role_id', 'roles_user_id_role_id'
  end
end
