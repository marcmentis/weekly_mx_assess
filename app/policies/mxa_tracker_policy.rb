class MxaTrackerPolicy < Struct.new(:current_user, :mxa_tracker)
	# attr_reader :current_user, :mxa_tracker

	# def initialize(current_user, mxa_tracker)
	# 	@current_user = current_user
	# 	@mxa_tracker = mxa_tracker
	# end

	def index?
		current_user.has_role? :admin3 or
		current_user.has_role? :admin2 or  
		current_user.has_role? :bps_crud or
		current_user.has_role? :bps_cru or
		current_user.has_role? :trackers_r or
		(			
			current_user.has_role? :trash1 and 
			current_user.has_role? :trash2
		)
	end
end