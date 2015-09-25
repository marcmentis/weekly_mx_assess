class ForSelectPolicy
	attr_reader :current_user, :model

	def initialize(current_user, model)
		@current_user = current_user
		@for_select = model
	end

	# def index?
	# 	true
	# end

	def complex_search?
		@current_user.has_role? :admin3 or 
		@current_user.has_role? :admin2 or
		@current_user.has_role? :admin1 or
		(			
			@current_user.has_role? :trash1 and 
			@current_user.has_role? :trash2
		)
	end

end