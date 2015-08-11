class MxAssessment < ActiveRecord::Base
	belongs_to :patient

	def self.get_pat_lists (params, facility)
		#byebug
		# Create @all_done an @all_to_do dependent upon what date should be used:
	    if params[:date_history] != ""
	      chosen_date = params[:date_history]
	      # Get all the Patients who have weekly notes from a given ward and date
	      all_done = MxAssessment.pat_all_done(params, chosen_date, facility)

	      # Get all Patients who do NOT have weekly notes from a given ward and date
	      all_to_do = MxAssessment.pat_all_to_do(params, all_done, facility)
	    elsif params[:new_date] != ""
	      chosen_date = params[:new_date]
	      # Get all the Patients who have weekly notes from a given ward and date
	      all_done = MxAssessment.pat_all_done(params, chosen_date, facility)

	      # Get all Patients who do NOT have weekly notes from a given ward and date
	      all_to_do = MxAssessment.pat_all_to_do(params, all_done, facility)
	    else
	      all_done = []
	      all_to_do = []
	      chosen_date = ""
	    end

	    return {pat_all_done: all_done, pat_all_to_do: all_to_do, meeting_date: chosen_date}
		
	end

	# Get all the Patients who have weekly notes from a given ward and date
		def self.pat_all_done(params, chosen_date, facility)
			# .where(mx_assessments: {meeting_date: chosen_date.to_date})
			# byebug
			# meet_date = Date.strptime(chosen_date, "%m/%d/%Y")
		    all_done = Patient.joins(:mx_assessments)
		    					.where(patients: {facility: facility})
		                  		.where(patients: {site: params[:site]})
		                 		.where(mx_assessments: {meeting_date: chosen_date})
		                		.order(lastname: :asc)
		end

		# Get all Patients who do NOT have weekly notes from a given ward and date
		def self.pat_all_to_do(params, all_done, facility)
			# Create an array of Pat.id to use in .where IN in @all_to_do
		    not_these_ids = all_done.each.map{|p| p.id}

		    # Passing .where.not an empty array results in a nil result. 
		       # An empty string will give all those patients in the ward not in the array
		    not_these_ids.empty? ? not_these_ids = [""] : not_these_ids

			all_to_do = Patient.where(patients: {site: params[:site]})
								.where(patients: {facility: facility})
	                  			.where.not(id: not_these_ids)
	                  			.order(lastname: :asc)	
		end
end
