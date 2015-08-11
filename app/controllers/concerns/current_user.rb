module CurrentUser
	def current_user
		# && logic
			# If session[:authen] = nil then 
				# Expression returns nil and @_corrent_user = nil
				# Regardless if User.find_by(authen: session) !=nil
			# If session[:authen] != nil and User.find_by(authen: session) = nil
				# Expression returns nil
				# @_current_user = session[:authen]
			# If session[:authen] != nil and User.find_by(authen: session) != nill
				# Expression returns User.find_by(authen: session)
				# @_current_user = User.find_by(authen: session)
		@_current_user ||= session[:authen] && User.find_by(authen: session[:authen])
	end
end