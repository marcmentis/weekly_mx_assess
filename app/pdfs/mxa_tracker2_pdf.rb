class MxaTracker2Pdf < Prawn::Document
	def initialize(data)
		super()
		@pat_demog = data[:pat_demog]
		@pat_assessments = data[:pat_assessments]
		heading
		body
	end

	def heading	
		# text "#{font_size.inspect}"	
		text "Past Management Assessments", style: :bold
		move_down 20
	end

	def body
		font_size(10)
		# Get pat_demog variables

		# firstname = @pat_demog[:firstname]
		# lastname = @pat_demog[:lastname]
		name = ''+@pat_demog[:lastname]+' '+@pat_demog[:firstname]+''
		@pat_demog[:doa].blank? ? doa = "" : doa = @pat_demog[:doa].strftime("%F")


		@pat_assessments.each do |a|
			# Get variables for current patient assessment
			a.meeting_date.blank? ? meeting_date = "" : meeting_date = a.meeting_date.strftime("%F")
			a.updated_at.blank? ? updated_at = "" : updated_at = a.updated_at.strftime("%F")
			a.pre_date.blank? ? pre_date = "" : pre_date = a.pre_date.strftime("%F")
			# Put days in hosp here
			days_in_hosp = '50'
			


			move_down 10
			stroke_horizontal_rule
			pad_top(5) { text 'MEETING DATE: '+meeting_date+'' }
			text "SAVED BY: "+a.updated_by+"   ON: "+updated_at+"   DAYS In HOSP: <color rgb='ff0000'>"+days_in_hosp+"</color>",
				inline_format: true
			text 'NAME: '+name+'    DOA: '+doa+''

			move_down 5
			text 'PATIENT DANGEROUS (Self/Others) IF IN APPROVED HOUSING: '+a.danger_yn+''

			if a.danger_yn == 'Y'
				text 'MEDS LAST CHANGED: '+a.drugs_last_changed+''
				if a.drugs_last_changed == '0-8Weeks'
					text a.drugs_change_why
				elsif a.drugs_last_changed == 'Gt8Weeks'
					text a.drugs_not_why
				end
				
			elsif a.danger_yn == 'N'
				text 'Date set for Pre-Conference Meeting: '+a.pre_date_yesno+''
				if a.pre_date_yesno == 'Y'
					text 'Date: '+pre_date+''
				elsif a.pre_date_yesno == 'N'
					text a.pre_date_no_why
				end
			end
		end
		
		
	end
end