class MxAssessment < ActiveRecord::Base
	include Jqgridconcern
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

	# Get jqGrid object for Mx Assessment Tracker
	def get_mxaw_jqGrid_obj(params)
		conditions = Patient.joins(:mx_assessments)
							.select('mx_assessments.*',
								:firstname, :lastname, :identifier, :site, :doa)
		conditions = conditions.where("facility = :facility", {facility: params[:facility]}) if params[:facility]!= '-1'
	    conditions = conditions.where("site = :site", {site: params[:site]}) if params[:site]!= '-1'
	    conditions = conditions.where("danger_yn = :danger_yn", {danger_yn: params[:danger_yn]}) if params[:danger_yn]!= '-1'

	 #    conditions = conditions.where("firstname = :firstname", {firstname: params[:firstname]}) if params[:firstname]!= ''
	    # conditions = conditions.where("firstname LIKE ?", ''+params[:firstname]+'%') if params[:firstname]!= ''
	    # conditions = conditions.where("lastname LIKE ?", ''+ params[:lastname]+'%') if params[:lastname]!= ''
	    # conditions = conditions.where("identifier LIKE ?", ''+params[:identifier]+'%') if params[:identifier]!= ''
	    
		
		return jqGrid_obj = create_jqGrid_obj(conditions, params)
	end
end
