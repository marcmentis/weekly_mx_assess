class ForSelectPolicy
	attr_reader :current_user, :model

	def initialize(current_user, model)
		@current_user = current_user
		@user = model
	end

	def index?
		# @current_user.role == 'admin2'
		# @current_user.has_role? :super_admin

	end
end