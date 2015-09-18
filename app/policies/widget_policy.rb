class WidgetPolicy < Struct.new(:current_user, :widget)
	# attr_reader :current_user, :widgets

	# def initialize(current_user, widget)
	# 	@current_user = current_user
	# 	@widget = widgets
	# end

	def index?
		current_user.has_role? :r_and_d
	end
end