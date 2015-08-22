class ForSelectPolicy
	attr_reader :current_user, :model

	def initialize(current_user, model)
		@current_user = current_user
		@for_select = model
	end

	def index?
		# @current_user.role == 'admin2'
		# @current_user.has_role? :super_admin
	end

	def complex_search?
		@current_user.has_role? :users_d and
		@current_user.has_role? :users_cruS or 
		@current_user.has_role? :admin3
	end

end