class ApplicationController < ActionController::Base
# Expose methods in these modules to all applicatins/views
	# I.E. DON"T have to have 'include SessionValues' in each controller
  include SessionValues
  include PhiAuditing
  include CurrentUser
  # include Pundit

  	


  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authorized_and_confirmed

  private
  	
  
end
