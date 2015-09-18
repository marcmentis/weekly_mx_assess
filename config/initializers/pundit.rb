# config/initializers/pundit.rb
# Extends the ApplicationController to add Pundit for authorization.
# Modify this file to change the behavior of a 'not authorized' error.
# Be sure to restart your server when you modify this file.

module PunditHelper
	extend ActiveSupport::Concern

	included do
		include Pundit  #Makes Pundit available to every controller (get 'authorize helper method')
		rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized  # Can define user-friendly display when can't see page
	end

	private
	  def user_not_authorized
	  	flash[:alert] = "Access denied."
	  	redirect_to(request.referrer || root_path)
	  end
end

ApplicationController.send :include, PunditHelper