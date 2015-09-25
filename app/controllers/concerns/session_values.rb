module SessionValues

	def authorized_and_confirmed
		if session[:confirmed] != 'authen_and_in_db'
			if Rails.env == 'development' || Rails.env == 'test'
				check_rsa_authorization_dev
				# puts "NOT AUTHORIZED AND CONFIRMED YET"
			elsif Rails.env == 'production'
				check_rsa_authorization_prod
			end
		end
		# puts "AUTHORIZED AND CONFIRMED"
	end

	private
		def check_rsa_authorization_dev
			session[:authen] = 'pgmdmjm'
			this_user = current_user
			if this_user.blank?
				@error = 'User has no privileges in this application'
				render file: "#{Rails.root}/public/user_error", layout: false		
			else
				session[:confirmed] = 'authen_and_in_db'
				session[:facility] = this_user.facility
				session[:admin3] = this_user.has_role? :admin3
				session[:user_name] = ''+this_user.lastname+' '+this_user.firstinitial+''
			end				
		end

		def check_rsa_authorization_prod
			if rfc_authorized? 
				session[:authen] = request.headers["HTTP_REMOTE_USER"]				
				this_user = current_user
				if this_user.blank?
					@error = 'User has no privileges in this application'
					render file: "#{Rails.root}/public/user_error", layout: false		
				else				
					session[:confirmed] = 'authen_and_in_db'
					session[:facility] = this_user.facility
					session[:admin3] = this_user.has_role? :admin3
					session[:user_name] = ''+this_user.lastname+' '+this_user.firstinitial+''
				end			
			else
				@error = 'User has not passed RSA authentication'
				render file: "#{Rails.root}/public/user_error", layout: false
			end		
		end

		def rfc_authorized?
			request.headers["HTTP_REMOTE_USER"].blank? ? false : true		
	  	end
	
end