module SessionValues

	# def check_session
	# 	if session[:authen].blank?
	# 		create_session
	# 	end
	# end

	# def test_before_action
	# 	if session[:authen].blank?
	# 		puts 'BLANK'
	# 		# puts 'HTTP_REMOTE_USER: '+request.headers["HTTP_REMOTE_USER"]+''
	# 	else
	# 		puts 'NOT BLANK'
	# 		puts ''+session[:authen]+''
	# 	end
	# end

	def check_rsa_authorization
		@request = request
		# session[:authen] = 'pgmdmjmff'

		# if Rails.env == 'production'
		if Rails.env == 'development' || Rails.env == 'test'
			dev_authen = 'pgmdmjm'
			session[:authen] = dev_authen
			puts 'CHECK_AUTHORIZATION DEVELOPMENT'
			puts ''+session[:authen]+''
			@current_user = current_user
			
		# elsif Rails.env == 'development' || Rails.env == 'production'
		elsif Rails.env == 'production'
			if rfc_authorized? 
				if current_user == nil
					@error = 'User has no privileges in this application'
					render file: "#{Rails.root}/public/user_error", layout: false
				else
					@current_user = current_user
					puts 'CURRENT_USER LEGAL'		
				end
			else
				@error = 'User has not passed RSA authentication'
				render file: "#{Rails.root}/public/user_error", layout: false
			end
		end 
	end

	private
		# def create_session

		# 	# Get 'request' and 'response' objects from Authentication system
		#     @request = request
		#     @response = response
		    
		#     # Raise a NoMethodError if user not in Users database
		#     # ? Differentiate between 'development' and 'production' for how this is done
		#     if @request.headers["HTTP_REMOTE_USER"].blank?
		# 	      # Artificially set session
		# 	      begin
		# 	        session[:authen] = 'pgmdmjm'
		# 	        @user = User.find_by(authen: session[:authen])
		# 	        session[:facility] = @user.facility
		# 	        session[:email] = @user.email
		# 	        session[:firstname] = @user.firstname
		# 	        session[:lastname] = @user.lastname
		# 	        session[:firstinitial] = @user.firstinitial
		# 	        session[:middleinitial] = @user.middleinitial
		# 	        session[:name] = ''+@user.firstinitial+' '+@user.middleinitial+' '+@user.lastname+''
			       

		# 	        # @for_select = ForSelect.where('value = ?', session[:facility]).first
		# 	        # session[:facilityname] = @for_select.text
		# 	      rescue NoMethodError
		# 	        render file: "#{Rails.root}/public/user_error", layout: false
		# 	      end
		      
		#     else
		# 		begin
		# 		session[:authen] = @request.headers["HTTP_REMOTE_USER"]
		# 		@user = User.find_by(authen: session[:authen])
		# 		# session[:facility] = @request.headers["HTTP_OMHFACILITYNUM"]
		# 		# session[:email] = @request.headers["HTTP_CTEMAIL"]
		# 		# session[:firstname] = @request.headers["HTTP_CTFN"]
		# 		# session[:lastname] = @request.headers["HTTP_CTLN"]
		# 		# session[:firstinitial] = @request.headers["HTTP_CTFN"]
		# 		# session[:middleinitial] = @request.headers["HTTP_INITIALS"]
		# 		session[:facility] = @user.facility
		# 		session[:email] = @user.email
		# 		session[:firstname] = @user.firstname
		# 		session[:lastname] = @user.lastname
		# 		session[:firstinitial] = @user.firstinitial
		# 		session[:middleinitial] = @user.middleinitial
		# 		session[:name] = ''+@user.firstinitial+' '+@user.middleinitial+' '+@user.lastname+''


		# 		@for_select = ForSelect.where('value = ?', session[:facility]).first
		# 		session[:facilityname] = @for_select.text
		# 		rescue NoMethodError
		# 		    render file: "#{Rails.root}/public/user_error", layout: false
		# 		end
		#  	end
		# end

		def rfc_authorized?
	  		if request.headers["HTTP_REMOTE_USER"].blank?
	  			return false
	  		else
	  			return true
	  		end
	  	end
	  	def current_user
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
			# @_current_user ||= User.find_by(authen: 'pgmdmjm')
		end
	
end