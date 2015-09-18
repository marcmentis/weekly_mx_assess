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
		# User MUST CHOOSE one of the two allLastNote options
		if params[:allLatestNote] == 'Latest'
			# Make subquery (IN) and GROUP BY in a text string
			conditions = conditions.where("meeting_date =(SELECT MAX(meeting_date) 
		    												FROM mx_assessments m 
		    												WHERE m.patient_id = mx_assessments.patient_id 
		    												GROUP BY m.patient_id)")
		elsif params[:allLatestNote] == 'All'
			# Do no filtering - allow all notes to be selected
		else
			# Create an empty activeRecord object
			conditions = conditions.where("1=2")
		end 
		conditions = conditions.where("facility = :facility", {facility: params[:facility]}) unless params[:facility] == '-1'
	    conditions = conditions.where("site = :site", {site: params[:site]}) unless params[:site] == '-1'
	    conditions = conditions.where("patient_id = :pid", {pid: params[:pid]}) unless params[:pid] == '-1'
	    conditions = conditions.where("danger_yn = :danger_yn", {danger_yn: params[:danger_yn]}) unless params[:danger_yn] == '-1'
	    conditions = conditions.where("drugs_last_changed = :drugs_last_changed", {drugs_last_changed: params[:drugs_last_changed]}) unless params[:drugs_last_changed] == '-1'
	    conditions = conditions.where("psychsoc_last_changed = :psychsoc_last_changed", {psychsoc_last_changed: params[:psychsoc_last_changed]}) unless params[:psychsoc_last_changed] == '-1'
	    conditions = conditions.where("pre_date_yesno = :pre_date_yesno", {pre_date_yesno: params[:pre_date_yesno]}) unless params[:pre_date_yesno] == '-1'
	    conditions = conditions.where("meeting_date > :dma", {dma: params[:dma]}) unless params[:dma].blank?
	    conditions = conditions.where("meeting_date < :dmb", {dmb: params[:dmb]}) unless params[:dmb].blank?
	    conditions = conditions.where("doa > :dda", {dda: params[:dda]}) unless params[:dda].blank?
	    conditions = conditions.where("doa < :ddb", {ddb: params[:ddb]}) unless params[:ddb].blank?
	    conditions = conditions.where("pre_date > :dpa", {dpa: params[:dpa]}) unless params[:dpa].blank?
	    conditions = conditions.where("pre_date < :dpb", {dpb: params[:dpb]}) unless params[:dpb].blank?
	    # conditions = conditions.order("lastname ASC, meeting_date DESC")	
		return jqGrid_obj = create_jqGrid_obj(conditions, params)
	end

	def get_mxaw_reasons_from_notes(params)
		conditions = Patient.joins(:mx_assessments)
						.select('mx_assessments.*',
							:firstname, :lastname, :identifier, :site, :doa)
		conditions = conditions.where("patient_id = :pid", {pid: params[:patient_id]})
		case params[:reason]
		when 'MedChange'
			conditions = conditions.where("drugs_last_changed = :drugs_last_changed", {drugs_last_changed: '0-8Weeks'})
		when 'MedNoChange'
			conditions = conditions.where("drugs_last_changed = :drugs_last_changed", {drugs_last_changed: 'Gt8Weeks'})
		when 'GroupChange'
			conditions = conditions.where("psychsoc_last_changed = :psychsoc_last_changed", {psychsoc_last_changed: '0-3Months'})
		when 'GroupNoChange'
			conditions = conditions.where("psychsoc_last_changed = :psychsoc_last_changed", {psychsoc_last_changed: 'Gt3Months'})
		when 'PreNoDate'
			conditions = conditions.where("pre_date_yesno = :pre_date_yesno", {pre_date_yesno: 'N'})
		else
			conditions = conditions.where("1=2")
		end	
		conditions = conditions.order("meeting_date DESC")
	end
end
